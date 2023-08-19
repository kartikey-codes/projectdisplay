import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Instances, Instance, useScroll } from "@react-three/drei";
import { AdditiveBlending, DoubleSide, MathUtils } from "three";
import { Vector3 } from "three";

const MAX_OPACITY=0.1;

function WindShape() {
  const ref = useRef();
  const state = useThree();
  const { height: viewPortHeight } = state.viewport.getCurrentViewport();
  const v3 = new Vector3();

  useFrame(({ camera }) => {
    if (ref.current) {
      const { current: el } = ref;
      const { height: elHeight } = el.instance.current.geometry.parameters;
      const { x: elPosition } = el.position;

      const worldPosition = el.getWorldPosition(v3);
      const limitPos = viewPortHeight - (worldPosition.y - elHeight / 2);
      if (limitPos < 0) {
        el.position.z = -(viewPortHeight + elHeight / 2);
        el.rotation.x = camera.rotation.x;
        elPosition.z=0;
    }
      
      el.position.z += 0.05; // Constant speed along Z-axis
      el.rotation.x = camera.rotation.x; // Apply rotation for the effect
    
}
  });

  return (
    <Instance
      ref={ref}
      color="white"
      position={[MathUtils.randFloatSpread(8), MathUtils.randFloatSpread(5), MathUtils.randFloatSpread(8)]}
      rotation-y={Math.PI / 2}
    />
  );
}

export const Speed = () => {

const lastScroll = useRef(0);
const scroll = useScroll();
const speedMaterial = useRef();

useFrame((_state, delta) => {
  if (scroll.offset - lastScroll.current > 0.0005){
  speedMaterial.current.opacity = MAX_OPACITY;
  }
  lastScroll.current = scroll.offset;
  if(speedMaterial.current.opacity > 0){
    speedMaterial.current.opacity -= delta * 0.2;
  }
})

  const INSTANCE = {
    number: 240,
  };
  
  return (
    <group>
      <Instances>
        <planeGeometry args={[1, 0.004]} />
        <meshBasicMaterial ref={speedMaterial} side={DoubleSide} blending={AdditiveBlending} opacity={0} transparent />
        {Array(INSTANCE.number)
          .fill()
          .map((_, key) => (
            <WindShape key={key} />
          ))}
      </Instances>
    </group>
  );
};

import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({ title, subtitle, buttonLabel, buttonLink, ...props }) => {
  const handleButtonLinkClick = () => {
    if (buttonLink) {
      window.location.href = buttonLink;
    }
  };

  return (
    <group {...props}>
      {!!title && (
        <Text
          color="white"
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          {title}
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}

      <Text
        color="white"
        anchorX={"left"}
        anchorY="top"
        fontSize={0.2}
        maxWidth={2.5}
        font={"./fonts/Inter-Regular.ttf"}
        style={{ textDecoration: buttonLink ? "underline" : "none" }} // Add underline style if a button link is present
      >
        {subtitle}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>

      {buttonLink && (
        <mesh
          position={[+1, -1, 0]} // Adjust the position of the button
          onPointerUp={handleButtonLinkClick} // Simulate link behavior for the button
        >
          <boxGeometry args={[1, 0.2, 0.3]} />
          <meshStandardMaterial color="blue" />
          <Text position={[0, 0, 0.2]} fontSize={0.15} color="white">
            {buttonLabel || "Click Here"} {/* Provide your button label */}
          </Text>
        </mesh>
      )}
    </group>
  );
};

export const Plane = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="green" />
    </mesh>
  );
};

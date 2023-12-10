import ReactThreeTestRenderer from "@react-three/test-renderer";
import { TestBox } from "./TestBox";

test("mesh to have two children", async () => {
  const renderer = await ReactThreeTestRenderer.create(<TestBox />);
  const meshChildren = renderer.scene.children[0].allChildren;
  expect(meshChildren.length).toBe(2);
});

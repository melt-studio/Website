import {
  MathUtils,
  LinearFilter,
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  WebGLRenderTarget,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  DataTexture,
} from "three";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader";

// Performs a gaussian blur on input texture and returns blurred texture
export const blur = (
  renderer,
  blurTextureSize,
  blurStrength,
  texture
  // name = ''
) => {
  if (blurStrength === 0) return { blurTexture: texture };

  console.log("Generating blur texture");

  // TO DO: set to nearest POT value below screen size
  const size = Math.min(blurTextureSize, 1024);
  const strength = MathUtils.clamp(blurStrength, 0, 20);

  let renderTargetA = new WebGLRenderTarget(size, size, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    // format: RGBAFormat,
    // encoding: sRGBEncoding,
  });
  let renderTargetB = new WebGLRenderTarget(size, size, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    // format: RGBAFormat,
    // encoding: sRGBEncoding,
  });
  const cameraBlur = new OrthographicCamera(-1, 1, 1, -1, -1, 1);
  const sceneBlurA = new Scene();
  const sceneBlurB = new Scene();
  const planeA = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial(HorizontalBlurShader));
  const planeB = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial(VerticalBlurShader));

  planeA.material.uniforms.h.value = 1 / size;
  planeB.material.uniforms.v.value = 1 / size;

  sceneBlurA.add(planeA);
  sceneBlurA.add(cameraBlur);
  sceneBlurB.add(planeB);
  sceneBlurB.add(cameraBlur);

  for (let i = 0; i < strength; i++) {
    if (i === 0) planeA.material.uniforms.tDiffuse.value = texture;
    else planeA.material.uniforms.tDiffuse.value = renderTargetB.texture;

    renderer.setRenderTarget(renderTargetA);
    renderer.clear();
    renderer.render(sceneBlurA, cameraBlur);

    planeB.material.uniforms.tDiffuse.value = renderTargetA.texture;

    renderer.setRenderTarget(renderTargetB);
    renderer.clear();
    renderer.render(sceneBlurB, cameraBlur);
  }

  renderer.setRenderTarget(null);

  planeA.geometry.dispose();
  planeB.geometry.dispose();
  planeA.material.dispose();
  planeB.material.dispose();
  sceneBlurA.remove(planeA);
  sceneBlurB.remove(planeB);

  // const blurImage = getBlurImage(
  //   renderer,
  //   renderTargetB,
  //   size,
  //   cameraBlur,
  //   name
  // )

  const getBlurImage = () => {
    const buffer = new Uint8Array(size * size * 4);
    renderer.readRenderTargetPixels(renderTargetB, 0, 0, size, size, buffer);

    const dataTexture = new DataTexture(buffer, size, size);
    dataTexture.needsUpdate = true;

    const r = new WebGLRenderer();
    r.setSize(size, size);
    r.setClearColor(0x000000);

    const scene = new Scene();
    scene.background = dataTexture;
    r.render(scene, cameraBlur);
    const imgData = r.domElement.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imgData;
    // const timestamp = new Date(Date.now()).toISOString();
    a.setAttribute(
      "download"
      // `melt_${name}_blur_${timestamp}.png`
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    r.dispose();
  };

  return { blurTexture: renderTargetB.texture, getBlurImage };
};

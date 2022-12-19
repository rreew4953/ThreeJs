//  目标：使用控制器查看 3d 物体

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机 透视和正交相机。具体看文档
// 75度的视角 宽高比 近距离裁剪 远距离裁剪
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerWidth,
  0.1,
  1000
);

//object3D => camera => 是对象
// 设置相机位置 X Y Z 轴线
camera.position.set(0, 0, 10);
//  添加相机到场景
scene.add(camera);

// 添加物体 缓冲立方体 (长 宽 高)
const cubeGeomertry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
// 基于集合体和材质创建物体
const cube = new THREE.Mesh(cubeGeomertry, cubeMaterial);
// 将几何体添加进场景
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerHeight, window.innerWidth);
// 渲染的是一个 cavas 元素 将其添加到 body 上
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器 控制相机和 cavas 画的 dom 元素
const controls = new OrbitControls(camera, renderer.domElement);

// 此时轨道控制器看起来不起作用 因为屏幕没有刷新帧率导致
// 添加动画帧函数
function render() {
  renderer.render(scene, camera);
  // 调用下一帧的时候再一次渲染
  requestAnimationFrame(render);
}
render();

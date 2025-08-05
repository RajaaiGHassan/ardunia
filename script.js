document.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "targets.mind", // Your marker file
    maxTrack: 1,
  });

  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(0); // First (and only) marker

  // Add simple 3D content (optional, can be empty)
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const plane = new THREE.Mesh(geometry, material);
  anchor.group.add(plane);

  // Audio element
  const audio = document.getElementById("ar-audio");

  anchor.onTargetFound = () => {
    console.log("Marker found");
    audio.play();
  };

  anchor.onTargetLost = () => {
    console.log("Marker lost");
    audio.pause();
    audio.currentTime = 0;
  };

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});

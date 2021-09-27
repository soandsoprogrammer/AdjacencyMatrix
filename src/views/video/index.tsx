import React from 'react';
const constraints = { audio: true, video: true }
// const getMedia = navigator.mediaDevices.getUserMedia || (navigator as any)?.webkitGetUserMedia || (navigator as any)?.getUserMedia
async function  getSteram () {
  const video: any = document.querySelector('.myvideo')
  video.srcObject = await navigator.mediaDevices?.getUserMedia(constraints)
}
function render () {
  return <>
  <video autoPlay playsInline  className={'myvideo'} />
    <button onClick={getSteram}>得到摄像头</button>
    <p>测试</p>
  </>
}

export default render
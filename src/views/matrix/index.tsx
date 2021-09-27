import React, {useEffect} from 'react';
import './index.css'
import AdjacencyMatrix from '../../class/AdjacencyMatrix'
import {jsPlumb} from 'jsplumb'

const jsplumbConnectOptions = {
  anchor: ['Left', 'Right', 'Top', 'Bottom', [0.3, 0, 0, -1], [0.7, 0, 0, -1], [0.3, 1, 0, 1], [0.7, 1, 0, 1]],
  connector: ['StateMachine'],
  endpoint: 'Blank',
  overlays: [ ['Arrow', { width: 8, length: 8, location: 1 }] ],
  paintStyle: { stroke: '#909399', strokeWidth: 2 }, // connector
}
function getNode () {
  const demo = new AdjacencyMatrix(['v0', 'v1', 'v2', 'v3', 'v4'])
  demo.setEdge('v0', ['v2', 'v3'])
  demo.setEdge('v1', ['v3', 'v4'])
  demo.setEdge('v2', ['v0', 'v3', 'v4'])
  demo.setEdge('v3', ['v0', 'v1', 'v2'])
  demo.setEdge('v4', ['v1', 'v2'])
  const vertex = demo.vertex
  console.log(demo.getCollection(['v2','v3']))
  const list = []
  for (let i = 0; i < vertex.length; i++) {
    list.push(<div key={vertex[i]} id={vertex[i]} className={'node'}>{vertex[i]}</div>)
  }
  return list
}
function drawLine() {
  let plumbIns = jsPlumb.getInstance()
  const connParam = {
    source: 'v1',
    target: 'v2',
  }
  plumbIns.connect(connParam, jsplumbConnectOptions)
}
function Matrix() {
  const list = getNode()
  useEffect(()=> {
    drawLine()
  })
  return <>
    {list}
  </>
}

export default Matrix
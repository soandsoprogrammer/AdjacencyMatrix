import React, {useEffect} from 'react';
import './index.css'
import AdjacencyMatrix from '../../class/AdjacencyMatrix'
import {jsPlumb} from 'jsplumb'
// import * as d3 from 'd3'



class Demo extends AdjacencyMatrix {
  private plumbIns = jsPlumb.getInstance()
  private connstions = new Map()
  constructor(v: string[]) {
    super(v);
    const node = document.querySelectorAll(".node")
    this.plumbIns.draggable(node, {containment: 'parent'})
  }

  setLine (id: string, edges: string[]) {
    this.setEdge(id, edges)
    edges.forEach(edge => {
      if (this.connstions.get(id) === edge) return
      const connParam = {source: id, target: edge}
      this.plumbIns.connect(connParam, jsplumbConnectOptions)
      this.connstions.set(id, edge)
    })
  }
}

const jsplumbConnectOptions = {
  anchor: ['Left', 'Right', 'Top', 'Bottom', [0.3, 0, 0, -1], [0.7, 0, 0, -1], [0.3, 1, 0, 1], [0.7, 1, 0, 1]],
  connector: ['Bezier'],
  endpoint: 'Blank',
  overlays: [ ['Arrow', { width: 8, length: 8, location: 1 }] ],
  paintStyle: { stroke: '#909399', strokeWidth: 2 }, // connector
}

const vertex = ['v0', 'v1', 'v2', 'v3', 'v4']
function getNode () {
  const list = []
  for (let i = 0; i < vertex.length; i++) {
    list.push(<div key={vertex[i]} style={{left: 200*i+'px'}} id={vertex[i]} className={'node'} >{vertex[i]}</div>)
  }
  return list
}
// function dragged(d) {
//   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
// }
function drawLine() {
  const demo = new Demo(vertex)
  demo.setLine('v0', ['v2', 'v3'])
  demo.setLine('v1', ['v3', 'v4'])
  demo.setLine('v2', ['v0', 'v3', 'v4'])
  demo.setLine('v3', ['v0', 'v1', 'v2'])
  demo.setLine('v4', ['v1', 'v2'])
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
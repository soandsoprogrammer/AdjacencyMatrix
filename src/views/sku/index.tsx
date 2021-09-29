import React, {useState, useMemo} from 'react';
import './index.css'
import AdjacencyMatrix from '../../class/AdjacencyMatrix'
import {commodityType, dataType} from "./interface";

const classNames = require('classnames');

class ShopAdjoin extends AdjacencyMatrix {
  commoditySpecs: commodityType[]
  data: dataType[]
  constructor(commoditySpecs: commodityType[], data: dataType[]) {
    super(commoditySpecs.reduce((total:string[], current) => [
      ...total,
      ...current.list,
    ], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();

  }
  applyCommodity(params: string[]) {
    params.forEach((param) => {
      this.setEdge(param, params);
    });
  }
  initCommodity() {
    this.data.forEach((item) => {
      this.applyCommodity(item.specs);
    });
  }


  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach((item) => {
      const params: string[] = [];
      item.list.forEach((value) => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params: any) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertex);
    }
    return params;
  }
}
const data = [
  { id: '1', specs: [ '紫色', '套餐一', '64G' ] },
  { id: '2', specs: [ '紫色', '套餐一', '128G' ] },
  { id: '3', specs: [ '紫色', '套餐二', '128G' ] },
  { id: '4', specs: [ '黑色', '套餐三', '256G' ] },
]
const commoditySpecs = [
  { title: '颜色', list: [ '红色', '紫色', '白色', '黑色' ] },
  { title: '套餐', list: [ '套餐一', '套餐二', '套餐三', '套餐四' ]},
  { title: '内存', list: [ '64G', '128G', '256G' ] }
]
console.log(1)
const shopAdjoin = new ShopAdjoin(commoditySpecs, data)

function SKU () {
  const [specsS, setSpecsS] = useState(Array.from({ length: commoditySpecs.length }));
  const optionSpecs = shopAdjoin.querySpecsOptions(specsS);
  function handleClick (flag: boolean, i: string, index: number) {
    console.log(i, specsS, optionSpecs)
    if (specsS[index] !== i && !flag) return;
    specsS[index] = specsS[index] === i ? '' : i;
    setSpecsS([...specsS]);
  }
  return <div className='container'>
    {
      commoditySpecs.map((item, index) =>
        <div className='container-item' key={'item'+index}>
          <p>{item.title}</p>
          <div className='options'>
            {item.list.map(i=> <div onClick={()=>handleClick(optionSpecs.indexOf(i) > -1, i, index)} className={classNames({
              option: true, active: specsS.indexOf(i) > -1, disable:  !(optionSpecs.indexOf(i) > -1)
            })} key={i+'option'}>{i}</div>)}
          </div>
        </div>
      )
    }
  </div>
}

export default SKU
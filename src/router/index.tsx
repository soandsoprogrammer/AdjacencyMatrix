import { Switch, Route } from 'react-router-dom'
import video from '../views/video'
import matrix from '../views/matrix'
import sku from '../views/sku'
function render () {
    return <Switch>
        <Route path='/tv' component={video} />
        <Route path='/matrix' component={matrix} />
        <Route path='/sku' component={sku} />
    </Switch>
}

export default  render
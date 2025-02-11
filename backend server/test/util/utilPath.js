import path from 'Path'
import {fileURLToPath} from 'url'

const root = path.join(
    path.dirname(fileURLToPath(import.meta.url)), '..'
)

export default root
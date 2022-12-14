import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faPlay,
    faPause,
    faAngleRight,
    faGaugeHigh,
    faCircleInfo,
    faShuffle,
    faTrash,
    faPencil,
    faEraser,
    faMoon,
    faSun,
} from '@fortawesome/free-solid-svg-icons'
import { App } from 'vue'

/* add icons to the library */
[
    faPlay,
    faPause,
    faAngleRight,
    faGaugeHigh,
    faCircleInfo,
    faShuffle,
    faTrash,
    faPencil,
    faEraser,
    faMoon,
    faSun,
].forEach(icon => {
    library.add(icon)
})

export function register(app: App): void {
    app.component('font-awesome-icon', FontAwesomeIcon)
}
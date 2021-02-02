import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    // provide typings for `this.$store`
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface ComponentCustomProperties {
        $store: Store<any>
    }
}

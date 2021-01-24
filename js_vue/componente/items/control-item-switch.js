
Vue.component('control-item-switch', {
    props: {
        mqttclient: Object,
        topico: Object
    },
    methods: {
        publicar: function () {
            if (this.mqttclient) {
                this.mqttclient.publish(this.topico.nombre, (this.topico.estatus) ? "OFF" : "ON", (error) => {
                    if (!error) {
                        this.topico.estatus = !this.topico.estatus;
                    }
                });
            }
        }
    },
    template: [
        '<div class="box p-a">',
            '<div class="row">',
                '<div class="col-sm-2">',
                    '<label class="ui-switch ui-switch-md info m-t-xs">',
                        '<input v-bind:id=\'"topic" + topico.id\' v-model="topico.estatus" v-on:click=\'publicar\' type="checkbox" >',
                        '<i></i>',
                    '</label>',
                '</div>',
                '<div class="col-sm-10">',
                    '<div class="row">',
                        '<div class="col-sm-12">',
                           '<label class="form-control-label">{{ topico.etiqueta }}</label>',
                        '</div>',
                        '<div class="col-sm-12">',
                            '<small class="text-muted">{{ topico.nombre }}</small>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('')
});
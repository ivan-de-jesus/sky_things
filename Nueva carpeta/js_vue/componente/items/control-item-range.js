
Vue.component('control-item-range', {
    props: {
        mqttclient: Object,
        topico: Object
    },
    data: function () {
        return {
            valor: 1
        };
    },
    methods: {
        publicar: function () {
            if (this.mqttclient) {
                this.mqttclient.publish(this.topico.nombre, this.valor, (error) => {
                    console.log(error || "OK");
                });
            }
        }
    },
    template: [
        '<div class="box p-a">',
            '<div class="row">',
                '<div class="col-12">',
                    '<div class="row">',
                        '<div class="col-8">',
                            '<div class="form-group">',
                                '<label class="form-control-label">{{ topico.etiqueta }}</label>',
                                '<input class="form-control-range" v-on:input="publicar" type="range" min="1" max="100" step="1" v-model="valor">',
                            '</div>',
                        '</div>',
                        '<div class="col-4">',
                            '<span style="font-size: xx-large;">{{ valor }}</span>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="col-12">',
                    '<small class="text-muted">{{ topico.nombre }}</small>',
                '</div>',
            '</div>',
        '</div>'
    ].join('')
});



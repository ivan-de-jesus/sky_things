
Vue.component('control-item-realtime', {
    props: {
        mqttclient: Object,
        topico: Object
    },
    template: [
        '<div class="box p-a">',
            '<div class="pull-left m-r">',
                '<span class="w-48 rounded  primary">',
                    '<i class="fa fa-question"></i>',
                '</span>',
            '</div>',
            '<div class="clear">',
                '<h4 class="m-0 text-lg _300"><b id="display_temp1">{{ topico.valor }}</b></h4>',
                '<h4 class="m-0 text-sm"><b id="display_temp1"> {{ topico.etiqueta }} </b></h4>',
                '<small class="text-muted"> {{ topico.nombre }}</small>',
            '</div>',
        '</div>'
    ].join('')
});
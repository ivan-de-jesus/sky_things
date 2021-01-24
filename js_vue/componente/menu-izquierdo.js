
Vue.component('menu-item', {
    props: {
        etiqueta: String,
        icono: String,
        link: String
    },
    template: [
        '<li>',
            '<a v-bind:href="link">',
                '<span class="nav-icon">',
                    '<i class="fa" v-bind:class="icono"></i>',
                '</span>',
                '<span class="nav-text"> {{ etiqueta }} </span>',
            '</a>',
        '</li>'
    ].join('')
});

Vue.component('menu-item-admin', {
    props: {
        etiqueta: String,
        icono: String,
        link: String,
        tipo: String
    },
    data: function () {
        return {
            isadmin: true
        };
    },
    mounted: function () {
        this.isadmin = (this.tipo === "administrador");
    },
    template: [
        '<li v-if="isadmin">',
            '<a v-bind:href="link">',
                '<span class="nav-icon">',
                    '<i class="fa" v-bind:class="icono"></i>',
                '</span>',
                '<span class="nav-text"> {{ etiqueta }} </span>',
            '</a>',
        '</li>'
    ].join('')
});

Vue.component('menu-izquierdo', {
    props: {
        tipousuario: String,
        usuario: String
    },
    data: function () {
        return {};
    },
    template: [
        '<div id="aside" class="app-aside modal nav-dropdown">',
            '<div id="ctrl_menu" class="left navside dark dk" data-layout="column">',
                '<div class="navbar no-radius">',
                    '<a class="navbar-brand">',
                        '<img v-bind:src="$base_url + \'img/icom_96.png\'">',
                        '<img v-bind:src="$base_url + \'assets/images/logo.png\'" alt="." class="hide">',
                        '<span class="hidden-folded inline">Domotica</span>',
                    '</a>',
                '</div>',
                '<div class="hide-scroll" data-flex>',
                    '<nav class="scroll nav-light">',
                        '<ul class="nav" ui-nav>',
                            '<li class="nav-header hidden-folded">',
                                '<small class="text-muted">Menu</small>',
                            '</li>',
                            '<li is="menu-item" etiqueta="Principal" icono="fa-dashboard" link="dashboard"></li>',
                            '<li is="menu-item-admin" etiqueta="Lugares" icono="fa-map-marker" link="lugar" v-bind:tipo="tipousuario"></li>',
                            '<li is="menu-item-admin" etiqueta="Dispositivos" icono="fa-cogs" link="dispositivo" v-bind:tipo="tipousuario"></li>',
                            '<li is="menu-item-admin" etiqueta="Tópicos" icono="fa-list" link="topico" v-bind:tipo="tipousuario"></li>',
                            '<li is="menu-item-admin" etiqueta="Invitados" icono="fa-users" link="invitado" v-bind:tipo="tipousuario"></li>',
                            '<li is="menu-item-admin" etiqueta="Permisos" icono="fa-lock" link="permiso" v-bind:tipo="tipousuario"></li>',
                        '</ul>',
                    '</nav>',
                '</div>',
                '<div class="b-t">',
                    '<div class="nav-fold">',
                        '<a href="javascript:void(0);">',
                            '<span class="pull-left">',
                                '<img v-bind:src="$base_url + \'assets/images/a0.jpg\'" alt="..." class="w-40 img-circle">',
                            '</span>',
                            '<span class="clear hidden-folded p-x">',
                                '<span class="block _500"> {{usuario}} </span>',
                                '<small class="block text-muted"><i class="fa fa-circle text-success m-r-sm"></i>online</small>',
                            '</span>',
                        '</a>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('')
});
// ==UserScript==
// @name         Aliexpress Porsino
// @namespace    chw.orochimaru
// @version      0.3
// @description  Script para destacar tiendas que hacen envíos por sinotrans en aliexpress
// @author       BRC
// @match        *.aliexpress.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

//var jsonPorSino = "https://cdn.rawgit.com/brcrepo/Aliexpress-por-sino/master/tiendasPorSino.json";
var jsonPorSino = "https://raw.githubusercontent.com/brcrepo/Aliexpress-por-sino/master/tiendasPorSino.json";

var tiendasPorSino;

//trae el json con el arreglo que contiene los numeros de tiendas
$.getJSON(jsonPorSino ,function(data){

    tiendasPorSino = data.tiendasPorSino;

});

$(function(){

    //listado de las tiendas que se muestran en la busqueda
    var listaDeProductos = $('li.list-item');

    $(listaDeProductos).each(function(){

        //extrae el numero de tienda
        var tienda = $(this).find(".store ").attr("href").split('/').pop();

        //ve si la tienda muestra envio por AliExpress Standard Shipping
        var isViaASS = $(this).find("dd.price").text().match(/via AliExpress Standard Shipping/gi);

        //comprueba que el numero de tienda este en el arreglo de tiendas conocidas
        var isPorsino = $.inArray(tienda, tiendasPorSino);

        if(isPorsino !== -1){

            //si la tienda es conocida le cambia el color de fondo a verde en la lista de productos
            $(this).css("background-color","#6B8E23");

        }else if(isViaASS){

            //si la tienda muestra envio por AliExpress Standard Shipping le cambia el color de fondo a amarillo en la lista de productos
            $(this).css("background-color","#ffe700");

        }


    });

});

function correosChileLink(){

    var aliTrackingNum = $(".shipping-bd td.no").text().replace(/ |\n/g,"").trim();
    var correosChileTrackingNum = aliTrackingNum.match(/\d{12}(?=001$)/);

    if(correosChileTrackingNum){

        $('<a class="ui-button ui-button-normal ui-track" href="http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+correosChileTrackingNum+'">Ver en Correos Chile</a>')
            .insertAfter("a.ui-track");

    }
}

correosChileLink();

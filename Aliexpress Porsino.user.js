// ==UserScript==
// @name         Aliexpress Porsino
// @namespace    chw.orochimaru
// @version      0.1
// @description  Script para destacar tiendas que hacen envíos por sinotrans en aliexpress
// @author       BRC
// @match        *.aliexpress.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

var jsonPorSino = "https://cdn.rawgit.com/brcrepo/Aliexpress-por-sino/master/tiendasPorSino.json";
var tiendasPorSino;

$.getJSON(jsonPorSino ,function(data){

    tiendasPorSino = data.tiendasPorSino;

});

$(function(){

    var listaDeProductos = $('li.list-item');

    $(listaDeProductos).each(function(){

        var tienda = $(this).find(".store ").attr("href").split('/').pop();
        var isPorsino = $.inArray(tienda, tiendasPorSino);

        if(isPorsino !== -1){

            $(this).css("background-color","#8DCF8A");

        }

    });

});

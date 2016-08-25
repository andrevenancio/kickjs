/* eslint-disable */
/**
* @author mrdoob / http://mrdoob.com/
* @author jetienne / http://jetienne.com/
* @author andre venancio / http://andrevenancio.com/
*/
/** @namespace */
var THREEx	= THREEx || {}

/**
* provide info on THREE.WebGLRenderer
*
* @param {Object} renderer the renderer to update
* @param {Object} Camera the camera to update
*/
THREEx.RendererStats	= function (){

    var msMin	= 100;
    var msMax	= 0;

    var container	= document.createElement( 'div' );
    container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

    var msDiv	= document.createElement( 'div' );
    msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#200;';
    container.appendChild( msDiv );

    var msTexts	= [];
    var nLines	= 9;
    for(var i = 0; i < nLines; i++){
        msTexts[i] = document.createElement( 'div' );
        if (i === 0) {
            msTexts[i].style.cssText = 'color:#311;background-color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
        } else {
            msTexts[i].style.cssText = 'color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
        }
        msDiv.appendChild( msTexts[i] );
        msTexts[i].innerHTML= '';
    }


    var lastTime	= Date.now();
    return {
        domElement: container,

        update: function(webGLRenderer){
            // sanity check
            console.assert(webGLRenderer instanceof THREE.WebGLRenderer)

            // refresh only 30time per second
            if( Date.now() - lastTime < 1000/30 )	return;
            lastTime	= Date.now()

            var i	= 0;
            msTexts[i++].textContent = "Draw calls: " + webGLRenderer.info.render.calls;
            msTexts[i++].textContent = "Programs: " + webGLRenderer.info.programs.length;
            msTexts[i++].textContent = "Geometries: " + webGLRenderer.info.memory.geometries;
            msTexts[i++].textContent = "Textures: " + webGLRenderer.info.memory.textures;
            msTexts[i++].textContent = "Vertices: " + webGLRenderer.info.render.vertices;
            msTexts[i++].textContent = "Faces: " + webGLRenderer.info.render.faces;
            msTexts[i++].textContent = "Points: " + webGLRenderer.info.render.points;
        }
    }
};

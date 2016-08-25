/**
 * Make all faces use unique vertices
 * so that each face can be separated from others
 *
 * @author alteredq / http://alteredqualia.com/
 * @author andrevenancio / http://andrevenancio.com/

 */

THREE.ExplodeModifier = function() {};

THREE.ExplodeModifier.prototype.modify = function(geometry) {

    var vertices = [];
    var faces = [];
    var uv = [];

    for (var i = 0, il = geometry.faces.length; i < il; i++) {
        var n = vertices.length;

        var face = geometry.faces[i];

        var a = face.a;
        var b = face.b;
        var c = face.c;

        var va = geometry.vertices[a];
        var vb = geometry.vertices[b];
        var vc = geometry.vertices[c];

        vertices.push(va.clone());
        vertices.push(vb.clone());
        vertices.push(vc.clone());

        face.a = n;
        face.b = n + 1;
        face.c = n + 2;

        faces.push(face.clone());

        // add other faces
        var extraFace1 = new THREE.Face3().copy(face)
        extraFace1.a = geometry.faces.length * 3 - 1
        var extraFace2 = new THREE.Face3().copy(face)
        extraFace2.b = geometry.faces.length * 3 - 1
        var extraFace3 = new THREE.Face3().copy(face)
        extraFace3.c = geometry.faces.length * 3 - 1

        faces.push(extraFace1);
        faces.push(extraFace2);
        faces.push(extraFace3);

        // adds uvs to avoid uv error
        // I don't really care for my particular example about the uvs, as I'm not using a texture, but I'm pretty sure the code below is not correct...
        var vuv = []
        vuv.push(new THREE.Vector2().copy(geometry.faceVertexUvs[0][i][0]));
        vuv.push(new THREE.Vector2().copy(geometry.faceVertexUvs[0][i][1]));
        vuv.push(new THREE.Vector2().copy(geometry.faceVertexUvs[0][i][2]));
        uv.push(vuv);

        // extra uvs per extra face
        uv.push(vuv);
        uv.push(vuv);
        uv.push(vuv);

    }

    geometry.vertices = vertices;
    geometry.vertices[vertices.length - 1] = new THREE.Vector3(0, 0, 0);
    geometry.faces = faces;
    geometry.faceVertexUvs[0] = uv;
};

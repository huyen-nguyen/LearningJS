// path:      an SVG <path> element
// threshold: a 'close-enough' limit (ignore subdivisions with area less than this)
// segments:  (optional) how many segments to subdivisions to create at each level
// returns:   a new SVG <polygon> element
function pathToPolygonViaSubdivision(path,threshold,segments){
    if (!threshold) threshold = 0.0001; // Get really, really close (ignore the region with area < 0.0001)
    if (!segments)  segments = 3;       // 2 segments creates 0-area triangles, min la 3

    var points = subdivide( ptWithLength(0), ptWithLength( path.getTotalLength() ) );
    for (var i=points.length;i--;) points[i] = [points[i].x,points[i].y];

    var doc  = path.ownerDocument;
    var poly = doc.createElementNS('http://www.w3.org/2000/svg','polygon');
    poly.setAttribute('points',points.join(' '));
    return poly;

    // Record the distance along the path with the point for later reference
    function ptWithLength(d) {
        var pt = path.getPointAtLength(d);
        pt.d = d; // Tao moi thuoc tinh d trong d (luu lai d)
        return pt;
    }

    // Create segments evenly spaced between two points on the path.
    // If the area of the result is less than the threshold return the endpoints.
    // Otherwise, keep the intermediary points and subdivide each consecutive pair.
    function subdivide(p1,p2){
        var pts=[p1];
        for (let i=1,step=(p2.d-p1.d)/segments;i<segments;i++){
            pts[i] = ptWithLength(p1.d + step*i);
        }
        pts.push(p2);
        if (polyArea(pts)<=threshold) return [p1,p2];
        else {
            var result = [];
            for (var i=1;i<pts.length;++i){
                var mids = subdivide(pts[i-1], pts[i]);
                mids.pop(); // We'll get the last point as the start of the next pair
                result = result.concat(mids)
            }
            result.push(p2);
            return result;
        }
    }
// ======= Dien tich hinh thang ========
    // Calculate the area of an polygon represented by an array of points
    function polyArea(points){
        var p1,p2;
        for(var area=0,len=points.length,i=0;i<len;++i){
            p1 = points[i];
            p2 = points[(i-1+len)%len]; // Previous point, with wraparound
            area += (p2.x+p1.x) * (p2.y-p1.y);
        }
        return Math.abs(area/2);
    }
}
class MathUtils
    
    @map: (num, min1, max1, min2, max2, round = false, constrainMin = true, constrainMax = true) ->
        if constrainMin and num < min1 then return min2
        if constrainMax and num > max1 then return max2
        
        num1 = (num - min1) / (max1 - min1)
        num2 = (num1 * (max2 - min2)) + min2
        if round then return Math.round(num2)
        return num2

    @getAngleBetweenVectors: (p1, p2, initialAngle=0) ->
        distance = @subtractVectors p1, p2
        return initialAngle + Math.atan2(distance.y, distance.x) / Math.PI * 180

    @subtractVectors: (p1, p2) ->
        return {
            x: p1.x - p2.x
            y: p1.y - p2.y
        }

    @getDistanceBetweenVectors: (p1, p2) ->
        distance = @subtractVectors p1, p2
        return Math.sqrt(distance.x*distance.x + distance.y*distance.y)
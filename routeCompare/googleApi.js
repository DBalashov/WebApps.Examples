class GoogleApi {

    constructor(parm) {
        this.parm = parm;
    }

    getName = 'Google API';

    getRoute = function (startPoint, endPoint) {
        return new Promise((resolve, reject) => {
            get(parm.Settings['graphhopper_url'] + '/route', {
                key: parm.Settings['graphhopper_api_key'],
                vehicle: 'car',
                type: 'json',
                point: [pointToParameterFormat(startPoint), pointToParameterFormat(endPoint)],
                points_encoded: 'false',
                locale: 'ru',
                instructions: 'false'
            }, function (route) {
                var result = Object();
                result.totalDistance = round(route.paths[0].distance / 1000);
                result.points = [];
                route.paths[0].points.coordinates.forEach(function (point) {
                        result.points.push([point[1], point[0]]);
                    }
                );
                return result;
            });
        });
    };
}
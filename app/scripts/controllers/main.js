'use strict';

/**
 * @ngdoc function
 * @name rpmAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpmAppApp
 */
angular.module('rpmAppApp')
  .controller('MainCtrl', function ($scope, leafletData, leafletBoundsHelpers, $filter, ngTableParams) {
    $scope.initMain = function () {
        $scope.chartEnergy();
        $scope.chartTempHum();
	};
	
    var mapContainerHeight = 300;
	var dataPoints = [
        [32,8, 0.1],
        [-12, 10, 0.8],
		[4,-48, 0.4],
        [-12, 56, 0.8],
    ];
    $scope.defaults = {
        scrollWheelZoom: false,
        crs: 'Simple',
        maxZoom: 2
    };
    $scope.maxBounds= leafletBoundsHelpers.createBoundsFromArray([[-1 * (mapContainerHeight), -600], [mapContainerHeight, 600]]);
    $scope.center = {
        lat: 0,
        lng: 0,
        zoom: 0 
    };
    $scope.layers = {
        baselayers: {
            premiseArea: {
                name: 'premiseArea',
                type: 'imageOverlay',
                url: 'data/floorplan/mall.svg',
                bounds: [[-1* (mapContainerHeight / 2), -300], [mapContainerHeight / 2, 300]],
                layerParams: {
                    noWrap: true
                }
            }
        },
        overlays: {
            heatmap: {
                name: 'Heat Map',
                type: 'heatmap',
                data: dataPoints,
                visible: true,
				layerOptions: {
					size: 10000000
				}
            }
        }
    };

    $scope.chartEnergy = function () {
        c3.generate({
            bindto: '#chartEnergy',
            data: {
                x: 'date',
                x_format: '%Y%m%d-%H',
                columns: [
                    ['date', '20140725-10', '20140725-11', '20140725-12', '20140725-13', '20140725-14', '20140725-15'],
                    ['equipment1', 240, 350, 300, 25, 100, 100], //the last data must be duplicated to show right chart
                    ['equipment2', 120, 300, 200, 10, 40, 40]
                ],
                types: {
                    equipment1: 'area-step',
                    equipment2: 'area-step'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d %b %H:%M'
                    }
                },
                y: {
                    label: {
                        text: 'Avg Power',
                        position: 'outer-middle'
                    }
                }
            },
            subchart: {
                show: true
            }
        });
    };
	
    $scope.chartTempHum = function () {
        c3.generate({
            bindto: '#chartTempHum',
            data: {
                x: 'date',
                x_format: '%Y%m%d-%H',
                columns: [
                    ['date', '20140725-10', '20140725-11', '20140725-12', '20140725-13', '20140725-14', '20140725-15'],
                    ['temperature', 10, 12, 8, 6, 14, 20],
                    ['humidity', 60, 75, 20, 10, 30, 15]
                ],
                axes: {
                    temperature: 'y',
                    humidity: 'y2'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d %b %H:%M'
                    }
                },
                y: {
                    label: {
                        text: '\u00B0C',
						position: 'outer-middle'
                    }
                },
                y2: {
                    show: true,
                    label: {
                        text: '%',
                        position: 'outer-middle'
                    }
                }
            },
            subchart: {
                show: true
            }
        });
    };
	
	var equipments = [
        {id: 'EQ_01', name: 'PAC Room 1', status: 'OK'},
        {id: 'EQ_02', name: 'PAC Room 2', status: 'OK'},
        {id: 'EQ_03', name: 'Power Panel 1', status: 'Not OK'},
        {id: 'EQ_04', name: 'UPS Room 1', status: 'OK'},
        {id: 'EQ_05', name: 'Power Panel 2', status: 'OK'}
    ];
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        filter: {
            id: ''
		},
        sorting: {
            id: 'asc'
		}
    },
	{
        total: equipments.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
                $filter('filter')(equipments, params.filter()) :
                equipments;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                equipments;
            params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
	});
	
  });

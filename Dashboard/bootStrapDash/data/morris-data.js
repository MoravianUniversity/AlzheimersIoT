$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2016 Q1',
            iphone: 64,
            ipad: null,
            itouch: 73
        }, {
            period: '2016 Q2',
            iphone: 83,
            ipad: 97,
            itouch: 17
        }, {
            period: '2016 Q3',
            iphone: 28,
            ipad: 67,
            itouch: 25
        }, {
            period: '2016 Q4',
            iphone: 67,
            ipad: 97,
            itouch: 89
        }, {
            period: '2016 Q1',
            iphone: 61,
            ipad: 91,
            itouch: 93
        }, {
            period: '2016 Q2',
            iphone: 67,
            ipad: 93,
            itouch: 81
        }, {
            period: '2016 Q3',
            iphone: 20,
            ipad: 95,
            itouch: 88
        }, {
            period: '2016 Q4',
            iphone: 73,
            ipad: 67,
            itouch: 75
        }, {
            period: '2017 Q1',
            iphone: 87,
            ipad: 60,
            itouch: 28
        }, {
            period: '2017 Q2',
            iphone: 82,
            ipad: 53,
            itouch: 91
        }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2016',
            a: 100,
            b: 90
        }, {
            y: '2016',
            a: 75,
            b: 65
        }, {
            y: '2016',
            a: 50,
            b: 40
        }, {
            y: '2016',
            a: 75,
            b: 65
        }, {
            y: '2016',
            a: 50,
            b: 40
        }, {
            y: '2017',
            a: 75,
            b: 65
        }, {
            y: '2017',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });
    
});

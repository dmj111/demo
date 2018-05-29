/* global  window, alert, console, document */

(function() {
    'use strict';

    // Naive sieve.
    function prime1(n) {
        const data = [];
        for (let i = 0; i < n; i += 1) {
            data.push(i);
        }
        data[1] = 0;
        for(let i = 2; i * i < n; i += 1) {
            if (data[i] > 0) {
                for (let j = i * i; j < n; j += i) {
                    data[j] = 0;
                }
            }
        }
        const result = [];
        for (let i of data) {
            if (i > 0) {
                result.push(i);
            }
        }
        return result;
    }


    // Naive sieve, but skip all the work on even numbered values.
    function prime2(n) {
        const data = [];
        for (let i = 1; i < n; i += 2) {
            data.push(i);
        }
        data[0] = 0;
        for(let i = 1; i < data.length; i+= 1) {
            if (data[i] > 0) {
                let k = data[i];
                let u = i * (1 + k);
                if (u > data.length) { break; }
                for (let j = u; j < data.length; j += k) {
                    data[j] = 0;
                }
            }
        }
        const result = [2];
        for (let i of data) {
            if (i > 0) {
                result.push(i);
            }
        }
        return result;
    }

    // Naive sieve, but skip all the work on even numbered values, and
    // use Int8Array for more compact data.
    function prime3(n) {
        const data = new Int8Array((n + 1) / 2);
        data[0] = 1;
        for(let i = 1; i < data.length; i+= 1) {
            if (data[i] === 0) {
                let k = 2 * i + 1;
                let u = i * (1 + k);
                if (u > data.length) { break; }
                for (let j = u; j < data.length; j += k) {
                    data[j] = 1;
                }
            }
        }
        const result = [2];
        for(let i = 0; i < data.length; i += 1) {
            if (data[i] == 0) {
                result.push(2 * i + 1);
            }
        }
        return result;
    }

    // Naive sieve, use wheel for skipping.
    // use Int8Array for more compact data.
    function prime4(n) {
        const data = new Int8Array((n + 1) / 2);
        data[0] = 1;

        // clear 3's
        for (let j = 4; j < data.length; j += 3) {
            data[j] = 1;
        }

        let step = 2;
        let u = 1;
        const result = [2, 3];
        for(let i = 2; i < data.length; i += step) {
            if (data[i] === 0) {
                let k = 2 * i + 1;
                result.push(k);
                if (u < data.length) {
                    u = i * (1 + k); // (i + 2 * i**2 + i
                    for (let j = u; j < data.length; j += k) {
                        data[j] = 1;
                    }
                }
            }
            step = 3 - step;
        }

        return result;
    }

    function run() {
        let result = document.getElementById('result');
        const N = 2000000;
        while (result.hasChildNodes()) {
            result.removeChild(result.lastChild);
        }

        let table = [];

        for (let item of [['prime1', prime1],
                          ['prime2', prime2],
                          ['prime3', prime3],
                          ['prime4', prime4],
                         ]) {
            for(let i = 0; i < 10; i += 1) {
                console.time(item[0]);
                let now = new Date().getTime();
                console.log(item[1](N).length);
                table.push({fcn: item[0], time: new Date().getTime() - now});
                console.timeEnd(item[0]);
            }
        }
        console.table(table);
    }

    window.addEventListener('load', function () {
        document.getElementById('run').addEventListener('click', run);
    });

}());

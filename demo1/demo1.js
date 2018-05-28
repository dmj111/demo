/* global  window, alert, console */

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
            if (data[i] == 0) {
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
    function run() {
        let result = document.getElementById('result');
        while (result.hasChildNodes()) {
            result.removeChild(result.lastChild);
        }
        console.log(prime3(20));
        let table = [];
        for(let i = 0; i < 10; i += 1) {
            console.time('prime3');
            let now = new Date().getTime();
            console.log(prime3(1000000).length);
            table.push({fcn: 'prime3', time: new Date().getTime() - now});
            console.timeEnd('prime3');

            console.time('prime2');
            now = new Date().getTime();
            console.log(prime2(1000000).length);
            table.push({fcn: 'prime2', time: new Date().getTime() - now});
            console.timeEnd('prime2');

            console.time('prime1');
            now = new Date().getTime();
            console.log(prime1(1000000).length);
            table.push({fcn: 'prime1', time: new Date().getTime() - now});
            console.timeEnd('prime1');
        }
        console.table(table);
    }

    window.addEventListener('load', function () {
        document.getElementById('run').addEventListener('click', run);
    });

}());

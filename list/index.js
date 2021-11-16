#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const colors = require('colors')
const path = require('path');

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
        if (err) {
            console.log(err);
        }

        const statPromises = filenames.map(filename => {
            return lstat(path.join(targetDir,filename));
        });

        const allStats = await Promise.all(statPromises);

        for (let stats of allStats) {
            const index = allStats.indexOf(stats);

            if (stats.isFile()) {
                console.log(filenames[index]);
            } else {
                console.log(colors.rainbow(filenames[index]));
            }
        }
    });
// OPTIONAL SOLUTION 
// const allStats = Array(filenames.length).fill(null);

// for (let filename of filenames){
//     const index = filenames.indexOf(filename);

//         fs.lstat(filename, (err,stats) => {
//             if (err) {
//                 console.log(err);
//             }
//             allStats[index] = stats;

//             const ready = allStats.every((stats)=> {
//                 return stats;
//             });

//             if (ready) {
//                 allStats.forEach((stats,index)=> {
//                     console.log(filenames[index], stats.isFile());
//                 })
//             }
//         });
//     }
//     console.log(filenames);



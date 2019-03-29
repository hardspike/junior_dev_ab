"use strict";

(() => {

    $(window).on("load", () => {

        //Defining buttons
        $("#showFirstQuiz").click(() => {
            $("#secondQuiz").fadeOut();
            $("#firstQuiz").fadeIn();
        });
        $("#showSecondQuiz").click(() => {
            $("#firstQuiz").fadeOut();
            $("#secondQuiz").fadeIn();
        });

        //Running first JS question on load
        let myArray = [1, 3, 55, 0, 3, 4, 78, 3, 8];
        $("#initialArray").text(myArray);
        sortArray(myArray);

        let num = 8;
        showSteps(num);
        $("#numInputBox").keyup(() => {
            num = $("#numInputBox").val();
            showSteps(num);
        });

    });



    function showSteps(num) {

        let combinationsSet = new Set(); // Set of all combinations from the function
        let arr = []; // Main array to add to the set when reaching a check point
        let itemIndex; // Locating a specific item in the array
        let tmpArr; // Duplication of main array
        let tmpArr2; // ""

        for (let i = 0; i < num; i++) {
            arr.push(1);
        }
        combinationsSet.add(arr.toString());

        for (let j = 0; j < arr.length; j++) {
            if (arr[arr.length - j - 1] == 1) {
                arr[0] += 1; // 2, 1, 1, 1, 1, 1, 1, 1 (8)
                arr.splice(arr.length - j - 1, 1); // 2, 1, 1, 1, 1, 1, 1, (7)
                if (sum(arr) == num) { // Validating that the array still sums up to the given number
                    combinationsSet.add(arr.toString());
                }

                itemIndex = arr.indexOf(1);
                if (itemIndex > -1) { // If array contains an item with value of 1, switch its index with the one before it
                    while (itemIndex > -1) {
                        arr[itemIndex - 1] = 1;
                        arr[itemIndex] = 2;

                        combinationsSet.add(arr.toString()); // 1, 2, 1, 1, 1, 1, 1 (7)

                        tmpArr = Object.assign([], arr); // Duplicating main array without overwriting it
                        if (itemIndex != tmpArr.length - 1) {
                            for (let l = 0; l < tmpArr.length; l++) {
                                if (tmpArr[l] == 1 && tmpArr.lastIndexOf(1) > -1 && tmpArr.lastIndexOf(1) > itemIndex) {

                                    tmpArr[l] += 1; // 2, 2, 1, 1, 1, 1, 1 (7)
                                    tmpArr.splice(tmpArr.lastIndexOf(1), 1); // 2, 2, 1, 1, 1, 1 (6)
                                    combinationsSet.add(tmpArr.toString());

                                    tmpArr2 = Object.assign([], tmpArr);
                                    let ll = l; // Duplicating "l" index without overwriting it

                                    while (tmpArr2.indexOf(1, ll) > -1) {

                                        let nextLL = tmpArr2.indexOf(1, ll);
                                        tmpArr2[tmpArr2.indexOf(1, ll)] += 1;
                                        tmpArr2[ll] -= 1; // 1, 2, 2, 1, 1, 1 (6)
                                        combinationsSet.add(tmpArr2.toString());
                                        ll = nextLL;
                                    }
                                }
                            }
                        }

                        itemIndex = arr.indexOf(1, itemIndex); // Finding the next "1" position in the array
                    }

                }
            }
        }
        $("#combinationsSet").html(Array.from(combinationsSet).join('<br>'));
    }

    function sum(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    function sortArray(myArray) {

        let sortedArray = [];
        let lowestNum;
        const initialLength = myArray.length;

        for (let j = 0; j < initialLength; j++) {

            lowestNum = myArray[0];

            // Get Minimal Number Without Using "Math.min(...myArray)";
            for (let i = 0; i < myArray.length; i++) {
                if (lowestNum > myArray[i]) {
                    lowestNum = myArray[i];
                }
            }

            sortedArray.push(lowestNum); // Push Current Lowest Number To Final Array
            myArray.splice($.inArray(lowestNum, myArray), 1); // Remove Current Lowest Number From Array
        }

        $("#sortedArray").text(sortedArray);
    }


})();
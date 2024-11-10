function isKeyMatched(text, key) {
    for (let item of text) {
        const [letter, status] = Object.entries(item)[0];
        if (!status) {
            return letter === key;
        }
    }
    return false;
}

// Set true to letters that were matched
function activateLetters() {
    for (let i = 0; i < currentText.length; i++) {
        const [letter, status] = Object.entries(currentText[i])[0];
        if (!status) {
            currentText[i][letter] = true;
            $("#letter-" + i).addClass("active");
            break;
        }
    }
}

// Get section with activated words
// function getSectionsIdOfActivatedWords(sectionsId) {
//     let activatedSectionsId = [];

//     sectionsId.forEach(sectionId => {
//         let section = sections[sectionId - 1];

//         if (section && section.word.every(letterObject => Object.values(letterObject)[0])) {
//             activatedSectionsId.push(sectionId);
//         }
//     });

//     return activatedSectionsId;
// }

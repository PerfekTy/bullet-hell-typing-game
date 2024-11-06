function getCorrectSections(key) {
    let correctSections = [];

    // We are checking sections if isBusy
    // then we check for letters in word in section
    // if letter in word is inactive then we check if key equals that letter
    sections.forEach(section => {
        if (section.isBusy) {
            let isFound = false;

            section.word.forEach(letterObject => {
                if (isFound) {
                    return;
                }

                let letterKey = Object.keys(letterObject)[0];
                let letterValue = letterObject[letterKey];

                if (!letterValue && letterKey === key) {
                    correctSections.push(section);
                    isFound = true;
                } else if (!letterValue) {
                    isFound = true;
                }
            })
        }
    });

    return correctSections;
}

// Set true to letters that were matched
function activateLetters(sectionsId) {
    sectionsId.forEach(sectionId => {
        let isActivated = false;

        sections[sectionId - 1].word.forEach((letterObject, index) => {
            if (isActivated) {
                return;
            }

            let letterKey = Object.keys(letterObject)[0];
            let letterValue = letterObject[letterKey];

            if (!letterValue) {
                letterObject[letterKey] = true;
                $("#" + sectionId + "-" + index).addClass("active");
                isActivated = true;
            }

        })
    })
}

// Get section with activated words
function getSectionsIdOfActivatedWords(sectionsId) {
    let activatedSectionsId = [];

    sectionsId.forEach(sectionId => {
        let section = sections[sectionId - 1];

        if (section && section.word.every(letterObject => Object.values(letterObject)[0])) {
            activatedSectionsId.push(sectionId);
        }
    });

    return activatedSectionsId;
}

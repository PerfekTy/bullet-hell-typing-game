function getAllTexts(callback) {
    $.get("./src/texts.txt", function(data) {
        let texts = data.trim().split('\n');
        callback(texts);
    });
}

function displayText(text) {
    let html = "";
    let letterIndex = 0;

    text.split('').forEach((char) => {
        if (char === " ") {
            html += '<span>' + char + '</span>';
        } else {
            let letterId = "letter-" + letterIndex;
            html += '<span id="' + letterId + '">' + char + '</span>';
            letterIndex++;
        }
    });

    $("#text-section").html(html);
    // adjustTextSize(sectionId);
}

function generateText()
{
    const randomIndex = Math.floor(Math.random() * allTexts.length);
    let randomText = allTexts[randomIndex];
    displayText(randomText);
    randomText = splitText(randomText);

    return randomText;
}

function removeText() {
    $("#text-section").html("");
}

function adjustTextSize(sectionId) {
    let fontSize = 1.5;
    let section = $('#s' + sectionId);
    let text = section.find('.enemy-word');

    while (text[0].scrollWidth > text[0].clientWidth) {
        fontSize -= 0.1;
        text.css('font-size', fontSize + 'rem');
    }
}

function splitText(text) {
    text = text.toUpperCase();
    let letters = [];

    for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
            continue;
        }

        let letter = text[i];
        letters.push({ [letter]: false });
    }

    return letters;
}

function isTextActivated() {
    return currentText.every(item => {
        const status = Object.values(item)[0];
        return status === true;
    });
}

function getAllTexts(callback) {
    $.get("./src/texts.txt", function(data) {
        let texts = data.trim().split('\n');

        // assignAttrToTexts(texts);
        callback(texts);
    });
}

function displayText(text) {
    let html = "";

    for (let i = 0; i < text.length; i++) {
        let letterId = "letter-" + i;

        html += '<span id="' + letterId + '">' + text[i] + '</span>';
    }

    $("#text-section").html(html);
    // adjustTextSize(sectionId);
}

function removeText(sectionId) {
    $("#text-section").html("");
}

function adjustTextSize(sectionId) {
    // default size
    let fontSize = 1.5;
    let section = $('#s' + sectionId);
    let text = section.find('.enemy-word');

    while (text[0].scrollWidth > text[0].clientWidth) {
        fontSize -= 0.1;
        text.css('font-size', fontSize + 'rem');
    }
}

// Returns array of objects of letters
function splitText(text) {
    // Modify text to uppercase
    text = text.toUpperCase();
    let letters = [];

    for (let i = 0; i < word.length; i++) {
        let letter = word[i];
        letters.push({ [letter]: false });
    }

    return letters;
}

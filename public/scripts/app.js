

//border radius slider
//drop shadow


const $fontFamilySelection = $('#fontFamily')
const $alertColor = $('#alertBoxColor');
const $alertBox = $('.alertBox');
const $alertButton = $('.dismiss');
const $alertMessage = $('#alertMessage');
const $alertMessageOut = $('.alertMessage');
const $alertMessageColor = $('#alertMessageColor');
const $alertBorderColor = $('#alertBoxBorderColor');
const $forms = $('form');
const $alertBoxForm = $('#alertBoxStyles');
const $buttonForm = $('#buttonStyles');
const $outputForm = $('#codeOutputForm');
const $colorForm = $('#colorPalette');
const $alertWidth = $('#alertBoxPaddingX');
const $alertHeight = $('#alertBoxPaddingY');
const $alertBorderWidth = $('#alertBoxBorderWidth');
const $alertBorderRadius = $('#alertBoxBorderRadius');
const $alertMessagePadding = $('#alertMessagePadding');
const $navButton = $('nav button');
const $boxNavButton = $('#alertBoxForm');
const $buttonNavButton = $('#buttonForm');
const $outputButton = $('#codeOutput');
const $colorButton = $('#colorPalette')
const $dismissButtonText = $('#buttonText1');
const $dismissButton = $('#dismiss');
const $buttonWidth = $('#buttonWidth');
const $buttonHeight = $('#buttonHeight');
const $buttonBgColor = $('#buttonBgColor');
const $buttonBorderWidth = $('#buttonBorderWidth');
const $buttonBorderRadius = $('#buttonBorderRadius');
const $buttonBorderColor = $('#buttonBorderColor');
const $buttonTextColor = $('#buttonTextColor');
const $outputHTML = $('#codeHTML');
const $outputCSS = $('#codeCSS');
const $alertMessageFormGroup = $('#messageClassGroup');
const $alertMessageClass = $('#alertMessageClass');
const $alertButtonClass = $('#buttonClass');
const $alertBoxClass = $('#alertBoxClass');
const $userAlertButton = $('#userAlerts');
const $userAlertsOut = $('#userAlertsOut');
const $alertsPage = $('#alertsPage');
const $homeButton = $('#home')
const $userAlertsBox = $('article.userAlerts > div');
const $userAlertsButton = $('article.userAlerts button');
const $userAlertsMessage = $('article.userAlerts > div > div');
const $confirmSubmit = $('#confirmSubmit');
const $colorBox = $('input.colorBox');
const $analogInput = $('#analogous');
const $monochromeInput = $('#monochrome');
const $splitInput = $('#split');
const $radioInputs = $('input:radio');
const $radioInputForm = $('#userColorInput');
const $paletteSelection = $('.paletteSelection');


let htmlToAppend, cssToAppend, dismissInlineCss, alertBoxObject, alertMessageObject, htmlClasses;

let cssToPost = { ...dismissInlineCss, ...alertBoxObject, ...alertMessageObject }



let color = tinycolor.random();
const colorBoxes = [...document.getElementsByClassName('colorBox')]


// $alertColor




const generateAnalog = (color) => {
    return color.analogous()
}

const generateMonochrome = (color) => {
    return color.monochromatic()
}

const generateSplit = (color) => {
    return color.splitcomplement()
}

const generateTriad = (color) => {
    return color.triad()
}



$radioInputs.on('click', function () {
    changeColorBoxes($( this ).val())
})



const changeColorBoxes = (colorCombo) => {
    if (colorCombo === undefined) {
        for (let i = 0; i < colorBoxes.length; i++) {
            color = tinycolor.random()
            colorBoxes[i].value = color.toHexString();
            colorBoxes[i].style.backgroundColor = color.toHexString();

            $paletteSelection.append(`
            <div id=${color.toHexString()} style="background-color:${color.toHexString()}" class="colorBox color${i}"></div>
            `)
        }
    } 
    else {
        $('div.colorBox').remove()
        for (let i = 0; i < colorBoxes.length; i++) {
            if (colorCombo === 'monochrome') {
                color = tinycolor.random()
                const monochrome = [...generateMonochrome(color)];
                colorBoxes[i].value = monochrome[i].toHexString()
                colorBoxes[i].style.backgroundColor = monochrome[i].toHexString();
                $paletteSelection.append(`
                <div id=${monochrome[i].toHexString()} style="background-color:${monochrome[i].toHexString()}" class="colorBox color${i}"></div>
                `)
            }
            else if (colorCombo === 'split') {
                color = tinycolor.random()
                const split = [...generateSplit(color)];
                split.push(tinycolor('grey'), tinycolor('grey'))
                colorBoxes[i].value = split[i].toHexString()
                colorBoxes[i].style.backgroundColor = split[i].toHexString();
                $paletteSelection.append(`
                <div id=${split[i].toHexString()} style="background-color:${split[i].toHexString()}" class="colorBox color${i}"></div>
                `)
            }
            else if (colorCombo === 'triad') {
                color = tinycolor.random()
                const triad = [...generateTriad(color)]
                triad.push(tinycolor('grey'), tinycolor('grey'))
                colorBoxes[i].value = triad[i].toHexString()
                colorBoxes[i].style.backgroundColor = triad[i].toHexString();
                $paletteSelection.append(`
                <div id=${triad[i].toHexString()} style="background-color:${triad[i].toHexString()}" class="colorBox color${i}"></div>
                `)
            }
            else if (colorCombo === 'analogous') {
                color = tinycolor.random()
                const analogous = [...generateAnalog(color)];
                colorBoxes[i].value = analogous[i].toHexString()
                colorBoxes[i].style.backgroundColor = analogous[i].toHexString();
                $paletteSelection.append(`
                <div id=${analogous[i].toHexString()} style="background-color:${analogous[i].toHexString()}" class="colorBox color${i}"></div>
                `)
            }
    
        }
    }
    const $colorBoxes = $('div.colorBox');
    $colorBoxes.each(function() {
        $(this).draggable({
            helper: 'clone',
            revert: true,
        })
    })

    $('input.col').each(function() {
        $(this).droppable({
            drop: function(event, ui) {
                const { draggable } = ui;
                console.log(draggable)
                $(this).val(draggable.attr('id'))
                changeColor($alertBox, 'background-color', $alertColor);
                changeColor($alertBox, 'border-color', $alertBorderColor);
                changeColor($alertMessageOut, 'color', $alertMessageColor);
                changeColor($dismissButton, 'background-color', $buttonBgColor)
                changeColor($dismissButton, 'border-color', $buttonBorderColor);
                changeColor($dismissButton, 'color', $buttonTextColor);
            }
        })
    })
}


$navButton.on('click', function(e) {
    e.preventDefault();
    $navButton.removeClass('active btn-dark').addClass('btn btn-light');
    $(this).removeClass('btn btn-light').addClass('active btn btn-dark');
    getCurrentForm()
})


$outputButton.on('click', () => {

    const dismissButton = document.getElementById('dismiss')

    const buttonComputedStyle = getComputedStyle(dismissButton)
    
    dismissInlineCss = `min-height:${$buttonHeight.val()}rem;width:${ $buttonWidth.val()}rem;background-color:${$buttonBgColor.val()};border-radius:${$buttonBorderRadius.val()}rem;border-color:${$buttonBorderColor.val()};color:${$buttonTextColor.val()};border-style:solid${$alertMessage.val() === '' ? `;margin-top:${$dismissButton.css('margin-top')}` : ''}${buttonComputedStyle.borderTopWidth === '0px'? '' : `;border-width:${$buttonBorderWidth.val()}rem`}`

    const dismissString = `{
    min-height: ${$buttonHeight.val()}rem; 
    width: ${$buttonWidth.val()}rem; 
    background-color: ${$buttonBgColor.val()}; 
    border-radius: ${$buttonBorderRadius.val()}rem; 
    border-color: ${$buttonBorderColor.val()};
    color: ${$buttonTextColor.val()};${$alertMessage.val() === '' ?  ` 
    margin-top: ${$dismissButton.css('margin-top')};` : ''} ${buttonComputedStyle.borderTopWidth === '0px'? '' : `
    border-width: ${$buttonBorderWidth.val()}rem;
    border-style: solid;`}
}`

    alertBoxObject = `background-color:${$alertColor.val()};border-color:${$alertBorderColor.val()};color:${$alertMessageColor.val()};width:${$alertWidth.val()}rem;height:${$alertHeight.val()}rem;border-radius:${$alertBorderRadius.val()}rem;font-family:${$fontFamilySelection.val()};text-align:center;border-style:solid;${$alertBorderWidth.val() == 0 ? '' : `border-width:${$alertBorderWidth.val()}rem`}`

    const alertBoxString = `{
    background-color: ${$alertColor.val()}; 
    border-color: ${$alertBorderColor.val()}; 
    color: ${$alertMessageColor.val()}; 
    width: ${$alertWidth.val()}rem; 
    height: ${$alertHeight.val()}rem; 
    border-radius: ${$alertBorderRadius.val()}rem;
    font-family: ${$fontFamilySelection.val()};
    text-align: center; ${$alertBorderWidth.val() == 0 ? '' : `
    border-width: ${$alertBorderWidth.val()}rem;
    border-style: solid;`}
}`

    alertMessageObject = `padding-top:${$alertMessagePadding.val()}rem;padding-bottom:${$alertMessagePadding.val()}rem`

    const alertMessageString = `{
    padding-top: ${$alertMessagePadding.val()}rem;
    padding-bottom: ${$alertMessagePadding.val()}rem;
}`


htmlToAppend = 
`<div class="${$alertBoxClass.val() === '' ? "alertBox" : $alertBoxClass.val()}">${$alertMessage.val() === '' ? '' : `
<p class="${$alertMessageClass.val() === '' ? "alertMessage" : $alertMessageClass.val()}">${$alertMessage.val()}</p>`}
<button class="${$alertButtonClass.val() === '' ? "dismiss" : $alertButtonClass.val()}">${$dismissButtonText.val()}</button>
</div>`

htmlContent = {
    button: `${$dismissButtonText.val()}`,
    alertMessage: $alertMessage.val()
}

cssToAppend = 
`html {
    font-size: 62.5%;
}

body {
    font-size: 1.4rem;
}

.${$alertBoxClass.val() === '' ? 'alertBox' : $alertBoxClass.val()} ${alertBoxString}

.${$alertButtonClass.val() === '' ? 'dismiss' :  $alertButtonClass.val()} ${dismissString} ${$alertMessage.val() === '' ? '' : `

.${$alertMessageClass.val() === '' ? 'alertMessage' : $alertMessageClass.val()} ${alertMessageString}`}`

cssToAppendObj = `html = {
    font-size: 62.5%;
}

body = {
    font-size: 1.4rem;
}

.${$alertBoxClass.val() === '' ? 'alertBox =' : $alertBoxClass.val()} ${alertBoxString}

.${$alertButtonClass.val() === '' ? 'dismiss =' :  $alertButtonClass.val()} ${dismissString} ${$alertMessage.val() === '' ? '' : `

.${$alertMessageClass.val() === '' ? 'alertMessage =' : $alertMessageClass.val()} ${alertMessageString}`}`

    $outputHTML.text(htmlToAppend)

    $outputCSS.text(cssToAppend)

})


//where the space is below: add button to close dialogue, position absolute to the alert box
$outputForm.on('submit', () => {
    $outputForm.append(`
    <div style="background-color:#31383B;border-color:#062533;color:#C1C7C9;width:30rem;height:18.25rem;border-radius:2.75rem;font-family:roboto;text-align:center;border-style:solid;border-width:0.8rem;position:absolute;top:21%;left:50%;margin-left:-15rem" id="addAlertDialogue">
    
    
        <div style="padding-top:2rem;padding-bottom:.5rem">
            <div class="form-group mx-4">
                <label for="creator" class="sr-only">Creator name:</label>
                <input type="text" name="alertBoxColor" id="creator" placeholder="Creator name" class="form-control">
            </div>
            <div class="form-group mx-4">
                <label for="newAlertName" class="sr-only">Alert name:</label>
                <input type="text" name="alertBoxColor" id="newAlertName" placeholder="Alert name" class="form-control mt-1">
            </div>
            <p class="mt-3 mb-3">default if empty: 'untitled' by anonymous</p>
        </div>
        <div class="btn-group w-100" role="group">
            <button id="confirmSubmit" style="min-height:3.5rem;width:12rem;background-color:#6F777A;border-radius:1.5rem;border-color:#062533;color:#ffffff;border-style:solid;border-width:0.5rem" 
            class="btn ml-4 mr-2"
            onclick="postUserAlert()">
            add to database
            </button>
            <button id="closeSubmit" style="min-height:3.5rem;width:12rem;background-color:#6F777A;border-radius:1.5rem;border-color:#062533;color:#ffffff;border-style:solid;border-width:0.5rem" 
            onclick="closeAlert()"
            class="btn mr-4 ml-2">
            cancel
            </button>
        </div>
    </div>
    `)

})




$fontFamilySelection.on('change', () => {
    getFontFamily($alertBox)
})

$alertColor.on('input, change', () => {
    changeColor($alertBox, 'background-color', $alertColor)
})

$alertMessage.on('input', () => {
    getMessage($alertMessageOut, $alertMessage);
    changeMessagePadding();
    showClassInput()
})

$alertBorderColor.on('input', () => {
    changeColor($alertBox, 'border-color', $alertBorderColor)
})

$alertMessageColor.on('input', () => {
    changeColor($alertMessageOut, 'color', $alertMessageColor)
})

$alertWidth.on('input', () => {
    changeUnit($alertBox, 'width', $alertWidth)
})

$alertHeight.on('input', () => {
    changeUnit($alertBox, 'height', $alertHeight)
})

$alertBorderWidth.on('input', () => {
    changeUnit($alertBox, 'border-width', $alertBorderWidth)
})

$alertBorderRadius.on('input', () => {
    changeUnit($alertBox, 'border-radius', $alertBorderRadius)
})

$alertMessagePadding.on('input', () => {
    changeMessagePadding()
})






$dismissButtonText.on('input', () => {
    getMessage($dismissButton, $dismissButtonText);
})

$buttonHeight.on('input', () => {
    changeUnit($dismissButton, 'min-height', $buttonHeight)
})

$buttonWidth.on('input', () => {
    changeUnit($dismissButton, 'width', $buttonWidth)
})

$buttonBgColor.on('input', () => {
    changeColor($dismissButton, 'background-color', $buttonBgColor)
})

$buttonBorderWidth.on('input', () => {
    changeUnit($dismissButton, 'border-width', $buttonBorderWidth)
})

$buttonBorderRadius.on('input', () => {
    changeUnit($dismissButton, 'border-radius', $buttonBorderRadius)
})

$buttonBorderColor.on('input', () => {
    changeColor($dismissButton, 'border-color', $buttonBorderColor)
})

$buttonTextColor.on('input', () => {
    changeColor($dismissButton, 'color', $buttonTextColor)
})

$userAlertButton.on('click', () => {
    getUserAlerts()
})

$homeButton.on('focus', () => {
    console.log('focused')
}).hover(() => {
    $homeButton.toggleClass('text-light')
},
() => {
    $homeButton.toggleClass('text-light')
})



const getFontFamily = (element) => {
    element.removeClass('lato montserrat raleway roboto').addClass($fontFamilySelection.val())
}

const changeColor = (target, property, source) => {
    target.css(property, source.val())
}

const changeUnit = (target, property, source) => {
    target.css(property, `${source.val()}rem`)
    //stretch: add variable for unit input
}

const changeMessagePadding = () => {
    changeUnit($alertMessageOut, 'padding-top', $alertMessagePadding)
    changeUnit($alertMessageOut, 'padding-bottom', $alertMessagePadding)
    if ($alertMessage.val() === '') {
        $alertMessageOut.addClass('d-none');
        changeUnit($alertButton, 'margin-top', $alertMessagePadding)
        $alertButton.css('margin-top', '3.25rem')
        $alertMessagePadding.on('input', () => {
            changeUnit($alertButton, 'margin-top', $alertMessagePadding)
        })
    } else {
        $alertMessagePadding.off().on('input', () => {
            changeMessagePadding()
        })
        $alertMessageOut.removeClass('d-none');
        $alertButton.css('margin-top', '0rem');
    }
}


const getMessage = ( target, source ) => {
    target.text( source.val() ) 
    if (source === $alertMessage) {
        if ($alertMessage.val() === '') {
            target.css('padding', '0')
            $alertMessagePadding.val(0)

        } else if ($alertMessage.val().length === 1) {
            source.css('padding', '0');
            $alertMessagePadding.val(1.5)
        }
    }
}

const getCurrentForm = () => {
    $forms.removeClass('d-block d-flex').addClass('d-none');

    if ($boxNavButton.hasClass('active')) {
        $alertBoxForm.addClass('d-block').removeClass('d-none');

    } 
    else if ($buttonNavButton.hasClass('active')) {
        $buttonForm.addClass('d-block').removeClass('d-none');

    }
    else if ($outputButton.hasClass('active')) {        
        $outputForm.addClass('d-block').removeClass('d-none');

    } 
    else {
        $colorForm.addClass('d-flex').removeClass('d-none');
    }
}

const showClassInput = () => {
    if ($alertMessage.val() === '') {
        $alertMessageFormGroup.hide();
    } else {
        $alertMessageFormGroup.show()
    }
}

const closeAlert = () => {
    const $addAlertDialogue = $('#addAlertDialogue')
    $addAlertDialogue.remove()
}


//**this should be executing on the bottom event listeners

const getUserAlerts = () => {
    if (window.location.pathname !== '/alerts.html' || window.location.hash.includes('id')) {
        window.location.href = 'alerts.html'
    }
    fetch('/api/alerts').then(res => res.json()).then(data => {
        data.forEach((object ) => {
            const { alerthtml, _id, alertcss, alertname, user } = object;
            $userAlertsOut.append(
`<article class="userAlerts ${_id} mx-4 mt-5 d-flex flex-column align-items-center justify-content-between">
    <div style="${decodeURIComponent(alertcss.alertBox)}" class="mb-5">
        ${alerthtml.alertMessage === '' ? '' : `
        <div style="${decodeURIComponent(alertcss.alertMessage)}">
            ${decodeURIComponent(alerthtml.alertMessage)}
        </div>`}
        <button tabindex="-1" style="${decodeURIComponent(alertcss.button)}">
            ${decodeURIComponent(alerthtml.button)}
        </button>
    </div>
    <div class="my-3 d-flex w-100">
        <div class="text-center mr-auto flex-shrink-1">    
            <h3 class="h4">"${alertname}"</h3>
            <h4 class="h5">By <span>${user}</span></h4>
        </div>
        <a class="ml-auto pl-4 seeMore" href="/alert/${_id}" id=${_id}>
            <i class="fas fa-angle-down "></i>
        </a>
    </div>
</article>
`)
        });
    })
}


const postUserAlert = () => {
    const $creator = $('#creator');
    const $newAlertName = $('#newAlertName');
    const creator = $creator.val() === '' ? 'Anonymous' : $creator.val();
    const newAlertName = $newAlertName.val() === '' ? 'Untitled' : $newAlertName.val();
    fetch('/api/alert/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: creator,
            alertname: newAlertName,
            alerthtml: {
                button: encodeURIComponent(htmlContent.button),
                alertMessage: encodeURIComponent(htmlContent.alertMessage),
                complete: encodeURIComponent(htmlToAppend),
            }, 
            alertcss: {
                button: encodeURIComponent(dismissInlineCss),
                alertBox: encodeURIComponent(alertBoxObject),
                alertMessage: encodeURIComponent(alertMessageObject),
                complete: encodeURIComponent(cssToAppend)
            },
        })
        
    }).then(() => {
        window.location.href = '/alerts.html'
    })
}

$( document ).on('click', 'a.seeMore', function (e) {
    e.preventDefault();
    $(this).toggleClass('open')
    console.log($(this).hasClass('open'))
    if ($(this).hasClass('open')) {
        window.location.replace('#id=' + $(this).attr('id'))
    } else if (!$(this).hasClass('open')) {
        window.location.replace('#') 
    }
    const $seeMoreButtons = $('.seeMore')
    const $singleCodeOutput = $('#codeOutputForm')
    $(this).toggleClass('active')
    $singleCodeOutput.remove()
    $seeMoreButtons.each(function() {
        $(this).parent().parent().removeClass('w-100');
        $(this).parent().addClass('w-100')
    })
    $(this).hasClass('active') ? 
    $(this).parent().parent().addClass('w-100').append(`
    <form id="codeOutputForm" class="bg-dark pl-5 pr-5 w-100">
        <div class="form-group pt-3">
            <div class="form-group">                        
                <label for="codeHTML" class="text-light">HTML: </label>
                <textarea name="codeHTML" id="codeHTML" cols="50" rows="15" class="form-control mt-1" readonly></textarea>
            </div>
            <div class="form-group">
                <label for="codeCSS" class="text-light">CSS: </label>
                <textarea name="codeCSS" id="codeCSS" cols="50" rows="15" class="form-control mt-1" readonly></textarea>
            </div>
        </div>
    </form>`)
    :
    $singleCodeOutput.remove()
    $(this).parent().removeClass('w-100')
    fetch('/alert/' + $(this).attr('id'), { id: $(this).attr('id') })
    .then(res => res.json())
    .then(({ alerthtml, alertcss }) => {
        const rawHtml = JSON.stringify(decodeURIComponent(alerthtml.complete))
        const rawCss = JSON.stringify(decodeURIComponent(alertcss.complete))
        const singleHtmlToAppend = rawHtml.replaceAll(/([\\])n+/g, `
    `).replaceAll(/([\\])/g, '').slice(1, -1)
    const singleCssToAppend = rawCss.replaceAll(/([\\])n+/g, `
    `)
    .replaceAll(/([\\])/g, ' ').slice(1, -1)
    $('#codeHTML').val(singleHtmlToAppend)
    $('#codeCSS').val(singleCssToAppend)
    }).catch(err => {
        console.log(err)
    })
})





getPrev = () => {

    getFontFamily($alertBox);
    changeColor($alertBox, 'background-color', $alertColor);
    changeColor($alertBox, 'border-color', $alertBorderColor);
    changeColor($alertMessageOut, 'color', $alertMessageColor);
    changeUnit($alertBox, 'width', $alertWidth)
    changeUnit($alertBox, 'height', $alertHeight)
    changeUnit($alertBox, 'border-width', $alertBorderWidth)
    changeUnit($alertBox, 'border-radius', $alertBorderRadius)
    getMessage($alertMessageOut, $alertMessage);
    getMessage($dismissButton, $dismissButtonText);
    changeUnit($dismissButton, 'min-height', $buttonHeight)
    changeUnit($dismissButton, 'width', $buttonWidth)
    changeColor($dismissButton, 'background-color', $buttonBgColor)
    changeUnit($dismissButton, 'border-width', $buttonBorderWidth)
    changeUnit($dismissButton, 'border-radius', $buttonBorderRadius)
    changeColor($dismissButton, 'border-color', $buttonBorderColor);
    changeColor($dismissButton, 'color', $buttonTextColor);
    changeColorBoxes()
    changeMessagePadding();
    showClassInput()
}


$( document ).ready(() => {
    if (window.location.pathname !== '/alerts.html') {
        getPrev();
        getCurrentForm();
    } else {
        if (window.location.pathname === '/alerts.html') {
            getUserAlerts()
        }
    }
})


{
    
    const sliders = document.querySelectorAll(".slider");
    const interval = 2800;
    const animDuration = 600;
    const slides = document.querySelectorAll(".slide");


    let currentIndex = 1;
    displaySlides(currentIndex);

    function setSlides(num) {
        displaySlides(currentIndex += num);
    }

    function displaySlides(num) {
        let x;
        if (num > slides.length) { currentIndex = 1 }
        if (num < 1) { currentIndex = slides.length }
        for (x = 0; x < slides.length; x++) {
            slides[x].style.display = "none";
        }
        slides[currentIndex - 1].style.display = "block";
    }

    for (let i = 0; i < sliders.length; ++i) {
        const slider = sliders[i];
        const dots = slider.querySelector(".dots");

        let currImg = 0;
        let prevImg = slides.length - 1;
        let intrvl;
        let timeout;

        for (let i = 0; i < slides.length; ++i) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dots.appendChild(dot);
            dot.addEventListener("click", dotClick.bind(null, i), false);
        }

        const allDots = dots.querySelectorAll(".dot");
        allDots[0].classList.add("active-dot");

        slides[0].style.left = "0";
        timeout = setTimeout(() => {
            animateSlider();
            slides[0].style.left = "";
            intrvl = setInterval(animateSlider, interval);
        }, interval - animDuration);

        function animateSlider(nextImg, right) {
            if (!nextImg)
                nextImg = currImg + 1 < slides.length ? currImg + 2 : 1;

            --nextImg;
            slides[prevImg].style.animationName = "";

            if (!right) {
                slides[nextImg].style.animationName = "leftNext";
                slides[currImg].style.animationName = "leftCurr";
            }
            else {
                slides[nextImg].style.animationName = "rightNext";
                slides[currImg].style.animationName = "rightCurr";
            }

            prevImg = currImg;
            currImg = nextImg;

            currDot = allDots[currImg];
            currDot.classList.add("active-dot");
            prevDot = allDots[prevImg];
            prevDot.classList.remove("active-dot");
        }

        function dotClick(num) {
            if (num == currImg)
                return false;

            clearTimeout(timeout);
            clearInterval(intrvl);

            if (num > currImg)
                animateSlider(num + 1);
            else
                animateSlider(num + 1, true);

            intrvl = setInterval(animateSlider, interval);
        }
    }
}
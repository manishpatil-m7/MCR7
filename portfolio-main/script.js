



/* =========================================================
   FOOTER YEAR
========================================================= */

(function () {

    const yearEl =
        document.getElementById("year");

    if (yearEl) {

        yearEl.textContent =
            new Date().getFullYear();

    }

})();



/* =========================================================
   TERMINAL TYPING
========================================================= */

(function () {

    const el =
        document.getElementById("terminalText");

    if (!el) return;


    const lines = [

        "building full-stack web apps",

        "designing clean interfaces",

        "turning rough ideas into products"

    ];


    let line = 0;

    let char = 0;

    let deleting = false;


    function tick() {

        const text =
            lines[line];


        if (!deleting) {

            char++;

            el.textContent =
                text.slice(0, char);


            if (char === text.length) {

                deleting = true;

                return setTimeout(
                    tick,
                    1600
                );
            }


            setTimeout(
                tick,
                70
            );

        }

        else {

            char--;

            el.textContent =
                text.slice(0, char);


            if (char === 0) {

                deleting = false;

                line =
                    (line + 1) %
                    lines.length;


                return setTimeout(
                    tick,
                    400
                );
            }


            setTimeout(
                tick,
                35
            );

        }

    }


    tick();

})();



/* =========================================================
   NAVIGATION
========================================================= */

(function () {

    const nav =
        document.getElementById("siteNav");

    const indicator =
        document.getElementById("navIndicator");

    const toggle =
        document.getElementById("menuToggle");

    const links =
        [
            ...document.querySelectorAll(
                "[data-nav]"
            )
        ];


    if (!nav) return;


    const ids = [

        "top",

        ...links.map(
            link =>
                link
                    .getAttribute("href")
                    .slice(1)
        )

    ];


    function moveIndicator(link) {

        if (!indicator) return;


        if (!link) {

            indicator.style.width =
                "0px";

            return;
        }


        indicator.style.width =
            link.offsetWidth + "px";


        indicator.style.transform =
            "translateX(" +
            link.offsetLeft +
            "px";

    }


    function setActive(id) {

        let active = null;


        links.forEach(link => {

            const on =
                link.getAttribute("href") ===
                "#" + id;


            link.classList.toggle(
                "active",
                on
            );


            if (on) {

                active = link;

            }

        });


        moveIndicator(active);

    }


    function onScroll() {

        let current =
            "top";


        ids.forEach(id => {

            const section =
                document.getElementById(id);


            if (
                section &&
                section
                    .getBoundingClientRect()
                    .top <= 120
            ) {

                current = id;

            }

        });


        if (
            innerHeight +
            scrollY >=
            document.body.scrollHeight - 2
        ) {

            current = "contact";

        }


        setActive(current);

    }


    addEventListener(
        "scroll",
        onScroll,
        { passive: true }
    );


    addEventListener(
        "resize",
        onScroll
    );


    onScroll();


    /* Mobile menu */

    if (toggle) {

        function closeMenu() {

            nav.classList.remove(
                "open"
            );

            toggle.classList.remove(
                "open"
            );

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        toggle.addEventListener(
            "click",
            () => {

                const open =
                    nav.classList.toggle(
                        "open"
                    );


                toggle.classList.toggle(
                    "open",
                    open
                );


                toggle.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }
        );


        links.forEach(
            link =>
                link.addEventListener(
                    "click",
                    closeMenu
                )
        );

    }

})();



/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

(function () {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    const status =
        document.getElementById(
            "formStatus"
        );


    const rules = {

        name:
            value =>
                value.trim().length >= 2
                    ? ""
                    : "Please enter your name.",


        email:
            value =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(value.trim())
                    ? ""
                    : "Please enter a valid email.",


        message:
            value =>
                value.trim().length >= 10
                    ? ""
                    : "Message should be at least 10 characters."

    };


    function check(id) {

        const input =
            document.getElementById(id);

        const error =
            document.getElementById(
                id + "Error"
            );


        const message =
            rules[id](input.value);


        error.textContent =
            message;


        input.classList.toggle(
            "invalid",
            !!message
        );


        return !message;

    }


    Object.keys(rules).forEach(
        id => {

            const input =
                document.getElementById(id);


            input.addEventListener(
                "blur",
                () => check(id)
            );

        }
    );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const valid =
                Object.keys(rules)
                    .map(id => check(id))
                    .every(Boolean);


            if (!valid) {

                status.textContent = "";

                return;

            }


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            const subject =
                encodeURIComponent(
                    "Portfolio message from " +
                    name
                );


            const body =
                encodeURIComponent(
                    message +
                    "\n\n— " +
                    name +
                    " (" +
                    email +
                    ")"
                );


            location.href =
                "mailto:manishhemantpatildev@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;


            status.textContent =
                "Opening your email app…";


            form.reset();

        }
    );

})();



/* =========================================================
   WEBSITE CRAWLER
========================================================= */

(function () {

    const canvas =
        document.getElementById(
            "web-canvas"
        );


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    /* -----------------------------------------------------
       CREATE CRAWLER ELEMENT
    ----------------------------------------------------- */
    let crawler = document.getElementById("crawler");
    if (!crawler) {
        crawler = document.createElement("div");
        crawler.id = "crawler";
        document.body.appendChild(crawler);
    }

    /* -----------------------------------------------------
       CANVAS SIZE
    ----------------------------------------------------- */
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    /* -----------------------------------------------------
       WRAP TEXT IN SPANS FOR WORD TARGETING
    ----------------------------------------------------- */
    function wrapWordsInSpans() {
        // Remove hardcoded crawl-target from structural elements
        document.querySelectorAll('.crawl-target').forEach(el => {
            el.classList.remove('crawl-target');
        });

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                const parent = node.parentNode;
                if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'NOSCRIPT' || parent.id === 'crawler' || parent.closest('#crawler') || parent.closest('.terminal')) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (node.nodeValue.trim() === '') {
                    return NodeFilter.FILTER_SKIP;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }, false);

        const nodesToWrap = [];
        let node;
        while (node = walker.nextNode()) {
            nodesToWrap.push(node);
        }

        nodesToWrap.forEach(textNode => {
            const words = textNode.nodeValue.split(/(\s+)/);
            const fragment = document.createDocumentFragment();
            let hasWord = false;
            words.forEach(word => {
                if (word.trim().length > 0) {
                    const span = document.createElement('span');
                    span.className = 'crawl-target';
                    span.textContent = word;
                    fragment.appendChild(span);
                    hasWord = true;
                } else {
                    fragment.appendChild(document.createTextNode(word));
                }
            });
            if (hasWord) {
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });
    }

    wrapWordsInSpans();

    /* -----------------------------------------------------
       FIND CRAWL TARGETS
    ----------------------------------------------------- */
    function getTargets() {
        let elements = [...document.querySelectorAll(".crawl-target")];
        return elements.filter(element => {
            const rect = element.getBoundingClientRect();
            return (rect.width > 0 && rect.height > 0);
        });
    }

    /* -----------------------------------------------------
       CRAWLER STATE (CRAB)
    ----------------------------------------------------- */
    let targets = getTargets();
    const NUM_LEGS = 8;
    let legs = [];
    
    let currentX = width * 0.5;
    let currentY = height * 0.25;
    let mouseX = width * 0.5;
    let mouseY = height * 0.25;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    for(let i=0; i<NUM_LEGS; i++) {
        legs.push({
            target: null,
            footX: currentX,
            footY: currentY
        });
    }

    const colors = ["#ff00ff", "#00ffff", "#ff8800", "#00ff00", "#ffff00"];

    function getPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            element: element
        };
    }

    /* -----------------------------------------------------
       UPDATE CRAWLER
    ----------------------------------------------------- */
    let currentAngle = 0;
    
    function updateCrawler() {
        const dxMouse = mouseX - currentX;
        const dyMouse = mouseY - currentY;
        const distToMouse = Math.hypot(dxMouse, dyMouse);
        
        currentX += dxMouse * 0.08;
        currentY += dyMouse * 0.08;
        
        if (distToMouse > 2) {
            currentAngle = Math.atan2(dyMouse, dxMouse);
        }
        
        // Rotate body to face movement direction (adding PI/2 so it faces "forward")
        const rotation = currentAngle + Math.PI / 2;
        crawler.style.transform = `translate(${currentX - 12}px, ${currentY - 12}px) rotate(${rotation}rad)`;

        targets = getTargets();
        if (!targets.length) return;

        let activeElements = legs.map(l => l.target).filter(t => t);

        legs.forEach((leg, index) => {
            let needsNewTarget = false;
            
            if (!leg.target) {
                needsNewTarget = true;
            } else {
                const pos = getPosition(leg.target);
                const dist = Math.hypot(pos.x - currentX, pos.y - currentY);
                // Drop target if too far (reduced range for Crab), or random chance
                if (dist > 100 || Math.random() < 0.01) {
                    leg.target.classList.remove("crawler-active");
                    leg.target = null;
                    needsNewTarget = true;
                }
            }

            if (needsNewTarget) {
                let available = targets.filter(t => !activeElements.includes(t));
                available.sort((a, b) => {
                    let pa = getPosition(a);
                    let pb = getPosition(b);
                    let da = Math.hypot(pa.x - currentX, pa.y - currentY);
                    let db = Math.hypot(pb.x - currentX, pb.y - currentY);
                    return da - db;
                });

                if (available.length > 0 && Math.hypot(getPosition(available[0]).x - currentX, getPosition(available[0]).y - currentY) < 100) {
                    // Pick from the 5 closest to make it natural and less rigid
                    let pick = available[Math.floor(Math.random() * Math.min(5, available.length))];
                    leg.target = pick;
                    activeElements.push(pick);
                    
                    pick.classList.add("crawler-active");
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    pick.style.setProperty("--target-color", color);
                }
            }

            // Animate foot
            if (leg.target) {
                const pos = getPosition(leg.target);
                leg.footX += (pos.x - leg.footX) * 0.3;
                leg.footY += (pos.y - leg.footY) * 0.3;
            } else {
                // Return foot to anatomical resting crab position
                const restAngles = [
                    -Math.PI*0.35, Math.PI*0.35,  // Front side
                    -Math.PI*0.5, Math.PI*0.5,    // Mid side
                    -Math.PI*0.65, Math.PI*0.65,  // Mid-back side
                    -Math.PI*0.8, Math.PI*0.8     // Back side
                ];
                const restDist = 35; // Larger body requires slightly further resting feet
                const targetFootX = currentX + Math.cos(currentAngle + restAngles[index]) * restDist;
                const targetFootY = currentY + Math.sin(currentAngle + restAngles[index]) * restDist;
                leg.footX += (targetFootX - leg.footX) * 0.2;
                leg.footY += (targetFootY - leg.footY) * 0.2;
            }
        });
    }

    /* -----------------------------------------------------
       DRAW NETWORK / LEGS
    ----------------------------------------------------- */
    function drawNetwork() {
        ctx.lineJoin = "round"; 
        ctx.lineCap = "round";

        // Draw Legs
        legs.forEach((leg, index) => {
            const dx = leg.footX - currentX;
            const dy = leg.footY - currentY;
            const angle = Math.atan2(dy, dx);
            
            const side = (index % 2 === 0) ? 1 : -1;
            const spread = (20 + Math.floor(index / 2) * 8) * side; // Scaled up spread
            
            const jointX = currentX + dx * 0.5 + Math.cos(angle + Math.PI/2) * spread;
            const jointY = currentY + dy * 0.5 + Math.sin(angle + Math.PI/2) * spread; 

            // Femur
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(jointX, jointY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#c03a15"; // Crab orange shell
            ctx.stroke();

            // Tibia
            ctx.beginPath();
            ctx.moveTo(jointX, jointY);
            ctx.lineTo(leg.footX, leg.footY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#e8693c"; // Lighter orange lower leg
            ctx.stroke();

            if (leg.target) {
                // Highlighted foot when grabbing a word
                ctx.beginPath();
                ctx.arc(leg.footX, leg.footY, 4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(40, 255, 120, 0.9)"; // Crab targets get a nice sea green glow
                ctx.fill();
            } else {
                // Resting foot dot
                ctx.beginPath();
                ctx.arc(leg.footX, leg.footY, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "#8a240d";
                ctx.fill();
            }
        });

        // Draw Crab Body
        ctx.save();
        ctx.translate(currentX, currentY);
        // Crabs walk sideways! We set rotation to currentAngle instead of currentAngle + PI/2.
        const rotation = currentAngle; 
        ctx.rotate(rotation);

        const shellColor = "#d64b27"; // Coral/Orange-red
        const strokeColor = "#8a240d";

        // --- Claws (Chelipeds) - Drawn under body ---
        ctx.fillStyle = shellColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        
        // Left Claw Arm
        ctx.beginPath();
        ctx.moveTo(-12, -6);
        ctx.lineTo(-20, -12);
        ctx.lineTo(-18, -22);
        ctx.stroke();
        // Left Pincer
        ctx.beginPath();
        ctx.arc(-18, -26, 7, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        // Left Pincer Blades
        ctx.beginPath();
        ctx.moveTo(-24, -28);
        ctx.lineTo(-15, -38); // inner blade
        ctx.lineTo(-15, -28); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-15, -28);
        ctx.lineTo(-9, -34); // outer blade
        ctx.lineTo(-12, -26);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right Claw Arm
        ctx.beginPath();
        ctx.moveTo(12, -6);
        ctx.lineTo(20, -12);
        ctx.lineTo(18, -22);
        ctx.stroke();
        // Right Pincer
        ctx.beginPath();
        ctx.arc(18, -26, 7, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        // Right Pincer Blades
        ctx.beginPath();
        ctx.moveTo(24, -28);
        ctx.lineTo(15, -38); 
        ctx.lineTo(15, -28); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(15, -28);
        ctx.lineTo(9, -34); 
        ctx.lineTo(12, -26);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // --- Carapace (Main Body) ---
        // Wide oval (Larger)
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 12, 0, 0, Math.PI*2);
        ctx.fillStyle = shellColor;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();

        // --- Eye Stalks ---
        // Left eye
        ctx.beginPath();
        ctx.moveTo(-5, -10);
        ctx.lineTo(-8, -16);
        ctx.lineWidth = 3;
        ctx.strokeStyle = shellColor;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-8, -18, 2.5, 0, Math.PI*2);
        ctx.fillStyle = "#111";
        ctx.fill();
        
        // Right eye
        ctx.beginPath();
        ctx.moveTo(5, -10);
        ctx.lineTo(8, -16);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(8, -18, 2.5, 0, Math.PI*2);
        ctx.fill();

        ctx.restore();
    }

    /* -----------------------------------------------------
       MAIN ANIMATION
    ----------------------------------------------------- */
    function animationLoop() {
        ctx.clearRect(0, 0, width, height);
        updateCrawler();
        drawNetwork();
        requestAnimationFrame(animationLoop);
    }

    setTimeout(() => {
        targets = getTargets();
        animationLoop();
    }, 700);

    /* -----------------------------------------------------
       SCROLL HANDLING
    ----------------------------------------------------- */

    window.addEventListener(
        "scroll",
        () => {

            /*
               The crawler automatically
               recalculates positions.
            */

            if (activeElement) {

                const position =
                    getPosition(
                        activeElement
                    );


                targetX =
                    position.x;


                targetY =
                    position.y;

            }

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------------------
       REFRESH TARGETS AFTER RESIZE
    ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            setTimeout(
                () => {

                    targets =
                        getTargets();

                },
                100
            );

        }
    );

})();
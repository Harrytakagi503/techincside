/**
 * Techincside - Cyberpunk PC Builder & IT Infrastructure
 * Responsive Interactive Frontend Script
 */

document.addEventListener("DOMContentLoaded", () => {
    // Console Welcome Signature
    console.log(
        "%c TECHINCSIDE // ONLINE %c CYBERPUNK PC RIG ENGINE ",
        "background: #00f3ff; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 3px 0 0 3px;",
        "background: #ff0055; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 0 3px 3px 0;"
    );

    /* ==========================================================================
       1. Mobile Navigation Menu Toggle
       ========================================================================== */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("open");
            if (isOpen) {
                navMenu.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            } else {
                navMenu.classList.add("open");
                navToggle.classList.add("open");
                navToggle.setAttribute("aria-expanded", "true");
            }
        });

        // Close mobile nav when clicking any nav link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close mobile nav when clicking outside header
        document.addEventListener("click", (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* ==========================================================================
       2. Hero Background Slideshow with Smooth Cross-Fade
       ========================================================================== */
    const slides = document.querySelectorAll(".hero-slideshow .slide");
    const slideDotsContainer = document.getElementById("slideDots");
    const prevSlideBtn = document.getElementById("prevSlide");
    const nextSlideBtn = document.getElementById("nextSlide");
    const heroSection = document.getElementById("home");
    
    let currentSlide = 0;
    let slideTimer = null;
    const SLIDE_INTERVAL = 3800; // 3.8 seconds per slide for a calm, premium showcase

    // Dynamically create slide dots
    if (slides.length > 0 && slideDotsContainer) {
        slideDotsContainer.innerHTML = "";
        slides.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.className = `slide-dot ${idx === 0 ? "active" : ""}`;
            dot.setAttribute("data-slide", idx);
            dot.setAttribute("aria-label", `Slide ${idx + 1}`);
            dot.addEventListener("click", () => {
                goToSlide(idx);
                restartTimer();
            });
            slideDotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll(".slide-dot");

    function goToSlide(index) {
        if (slides.length <= 1) return;

        slides[currentSlide].classList.remove("active");
        if (dots[currentSlide]) dots[currentSlide].classList.remove("active");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startTimer() {
        if (slides.length > 1 && !slideTimer) {
            slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
        }
    }

    function stopTimer() {
        if (slideTimer) {
            clearInterval(slideTimer);
            slideTimer = null;
        }
    }

    function restartTimer() {
        stopTimer();
        startTimer();
    }

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener("click", () => {
            prevSlide();
            restartTimer();
        });
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener("click", () => {
            nextSlide();
            restartTimer();
        });
    }

    // Pause slideshow on mouse hover for desktop users
    if (heroSection) {
        heroSection.addEventListener("mouseenter", stopTimer);
        heroSection.addEventListener("mouseleave", startTimer);

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        heroSection.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDiff = touchEndX - touchStartX;
            if (Math.abs(swipeDiff) > 45) {
                if (swipeDiff < 0) {
                    nextSlide(); // Swiped left -> next
                } else {
                    prevSlide(); // Swiped right -> prev
                }
                restartTimer();
            }
        }
    }

    // Initialize slideshow
    startTimer();

    /* ==========================================================================
       3. Active Navigation ScrollSpy
       ========================================================================== */
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = 80;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight;
            const sectionId = current.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });

    /* ==========================================================================
       4. Interactive PC Build Simulator & Consultation Link Generator
       ========================================================================== */
    let selectedPurpose = "PC Gaming eSports & AAA";
    let selectedBudget = "Rp 10 - 20 Juta (Mid-Range Sweet Spot)";
    let selectedPlatform = "Intel Core + Nvidia GeForce RTX";

    const summaryPurpose = document.getElementById("summaryPurpose");
    const summaryBudget = document.getElementById("summaryBudget");
    const summaryPlatform = document.getElementById("summaryPlatform");
    const summaryHint = document.getElementById("summaryHint");
    const btnSendSimulation = document.getElementById("btnSendSimulation");

    const optionButtons = document.querySelectorAll(".opt-btn");

    const hints = {
        "PC Gaming eSports & AAA": {
            "Rp 5 - 10 Juta (Entry Level Power)": "Rekomendasi: Core i3 / Ryzen 5 + GTX 1650/RX 6600. Sangat mulus untuk Valorant, GTA V, Dota 2, CS2 1080p.",
            "Rp 10 - 20 Juta (Mid-Range Sweet Spot)": "Rekomendasi: Core i5-13400F / Ryzen 5 7500F + RTX 4060 / RX 7600 XT. Libas game AAA rata kanan 1080p & 1440p high FPS!",
            "Rp 20 - 35 Juta (High-End Beast)": "Rekomendasi: Core i7 / Ryzen 7 7800X3D + RTX 4070 Ti Super. Setup monster untuk 1440p 240Hz & 4K gaming tanpa kompromi.",
            "Rp 35 Juta+ (Ultra Enthusiast / Workstation)": "Rekomendasi: Ryzen 9 / Core i9 + RTX 4080 Super / RTX 4090. Rig impian dengan pendingin liquid 360mm dan casing showcase premium."
        },
        "Editing Video & Render 3D": {
            "Rp 5 - 10 Juta (Entry Level Power)": "Rekomendasi: 16GB RAM + SSD NVMe Gen4. Mumpuni untuk editing video 1080p CapCut, Premiere Pro ringan & desain Photoshop.",
            "Rp 10 - 20 Juta (Mid-Range Sweet Spot)": "Rekomendasi: 32GB RAM DDR5 + GPU RTX Nvidia dengan CUDA core untuk rendering Premiere, After Effects, dan Blender kilat.",
            "Rp 20 - 35 Juta (High-End Beast)": "Rekomendasi: 64GB RAM DDR5 + RTX 4070 Ti / 4080 + NVMe 2TB. Render multi-layer 4K/8K timeline super responsif.",
            "Rp 35 Juta+ (Ultra Enthusiast / Workstation)": "Rekomendasi: Workstation level studio: 64-128GB ECC/DDR5 RAM, multi NVMe RAID, dan kartu grafis RTX kelas atas."
        },
        "Office, Desain & Multitasking": {
            "Rp 5 - 10 Juta (Entry Level Power)": "Rekomendasi: Core i3 / Ryzen 5 APU + NVMe SSD cepat + Dual Monitor support. Bebas lemot untuk kasir, admin & multitasking harian.",
            "Rp 10 - 20 Juta (Mid-Range Sweet Spot)": "Rekomendasi: 32GB RAM + GPU Dedicated. Sangat prima untuk arsitek AutoCAD, Revit, SketchUp, dan akuntansi korporat.",
            "Rp 20 - 35 Juta (High-End Beast)": "Rekomendasi: Desktop bisnis ultra-silent, backup data redundancy, komponen daya tahan tinggi industrial.",
            "Rp 35 Juta+ (Ultra Enthusiast / Workstation)": "Rekomendasi: Workstation korporat data science, simulasi CAD tingkat lanjut & komputasi intensif."
        },
        "Server Kantor / Workstation": {
            "Rp 5 - 10 Juta (Entry Level Power)": "Rekomendasi: Micro Server / NAS untuk file sharing kantor, database lokal, dan print server hemat daya 24/7.",
            "Rp 10 - 20 Juta (Mid-Range Sweet Spot)": "Rekomendasi: Proxmox VE / Linux Server dengan RAID 1 Mirroring untuk virtualisasi VM kantor cabang & backup terjadwal.",
            "Rp 20 - 35 Juta (High-End Beast)": "Rekomendasi: Server rackmount / tower dengan pendingin server grade, dual NIC Gigabit/10G, dan kapasitas storage besar.",
            "Rp 35 Juta+ (Ultra Enthusiast / Workstation)": "Rekomendasi: Enterprise Cloud / Local Virtualization Host dengan hot-swap storage dan catu daya redundan."
        }
    };

    function updateSimulatorUI() {
        if (summaryPurpose) summaryPurpose.textContent = selectedPurpose;
        if (summaryBudget) summaryBudget.textContent = selectedBudget;
        if (summaryPlatform) summaryPlatform.textContent = selectedPlatform;

        // Update hint text
        let hintText = "Spesifikasi akan diracik secara presisi dengan komponen 100% baru, bergaransi resmi, dan cable management rapi.";
        if (hints[selectedPurpose] && hints[selectedPurpose][selectedBudget]) {
            hintText = hints[selectedPurpose][selectedBudget];
        }
        if (summaryHint) {
            summaryHint.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${hintText}`;
        }

        // Generate WhatsApp Consultation URL
        const phone = "6289508129920";
        const messageText = 
            `Halo Techincside, saya ingin konsultasi rakit PC dengan rincian berikut:\n` +
            `• Kebutuhan: ${selectedPurpose}\n` +
            `• Budget: ${selectedBudget}\n` +
            `• Preferensi: ${selectedPlatform}\n\n` +
            `Mohon saran racikan spesifikasi terbaik dan estimasi harganya. Terima kasih!`;

        const encodedMsg = encodeURIComponent(messageText);
        if (btnSendSimulation) {
            btnSendSimulation.href = `https://wa.me/${phone}?text=${encodedMsg}`;
        }
    }

    optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const type = btn.getAttribute("data-type");
            const val = btn.getAttribute("data-val");

            // Deactivate siblings in the same option group
            const parent = btn.parentElement;
            if (parent) {
                parent.querySelectorAll(".opt-btn").forEach((sibling) => {
                    sibling.classList.remove("active");
                });
            }
            btn.classList.add("active");

            if (type === "purpose") selectedPurpose = val;
            if (type === "budget") selectedBudget = val;
            if (type === "platform") selectedPlatform = val;

            updateSimulatorUI();
        });
    });

    // Run once on initial load
    updateSimulatorUI();

    /* ==========================================================================
       5. Quick Contact Form Handler
       ========================================================================== */
    const quickContactForm = document.getElementById("quickContactForm");
    if (quickContactForm) {
        quickContactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("clientName") ? document.getElementById("clientName").value.trim() : "";
            const service = document.getElementById("clientService") ? document.getElementById("clientService").value : "";
            const budget = document.getElementById("clientBudget") ? document.getElementById("clientBudget").value.trim() : "";
            const notes = document.getElementById("clientMessage") ? document.getElementById("clientMessage").value.trim() : "";

            if (!name) {
                showToast("Silakan masukkan nama Anda!");
                return;
            }

            const phone = "6289508129920";
            let msg = `Halo Techincside, saya ${name}.\n` +
                      `Saya ingin konsultasi mengenai:\n` +
                      `• Layanan: ${service}\n`;
            
            if (budget) {
                msg += `• Perkiraan Budget: ${budget}\n`;
            }
            if (notes) {
                msg += `• Kebutuhan / Catatan: ${notes}\n`;
            }
            msg += `\nMohon info dan rekomendasinya. Terima kasih!`;

            const encoded = encodeURIComponent(msg);
            window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
        });
    }

    /* ==========================================================================
       6. Copy Address & Toast Notification
       ========================================================================== */
    const btnCopyAddress = document.getElementById("btnCopyAddress");
    const addressText = document.getElementById("addressText");
    const copyText = document.getElementById("copyText");
    const toast = document.getElementById("toast");

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    if (btnCopyAddress && addressText) {
        btnCopyAddress.addEventListener("click", () => {
            const textToCopy = addressText.textContent.trim();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        if (copyText) copyText.textContent = "Tersalin!";
                        showToast("Alamat workshop berhasil disalin ke clipboard!");
                        setTimeout(() => {
                            if (copyText) copyText.textContent = "Salin Alamat";
                        }, 2500);
                    })
                    .catch(() => {
                        fallbackCopy(textToCopy);
                    });
            } else {
                fallbackCopy(textToCopy);
            }
        });

        function fallbackCopy(text) {
            const tempInput = document.createElement("textarea");
            tempInput.value = text;
            tempInput.style.position = "fixed";
            tempInput.style.opacity = "0";
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand("copy");
                if (copyText) copyText.textContent = "Tersalin!";
                showToast("Alamat workshop berhasil disalin!");
                setTimeout(() => {
                    if (copyText) copyText.textContent = "Salin Alamat";
                }, 2500);
            } catch (err) {
                showToast("Gagal menyalin alamat.");
            }
            document.body.removeChild(tempInput);
        }
    }

    /* ==========================================================================
       7. Back to Top Button
       ========================================================================== */
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }, { passive: true });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

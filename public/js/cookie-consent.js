/**
 * Professional Cookie Consent Manager
 * Handles consent banner, preference modal, and cookie logic.
 */

const CookieConsent = {
    KEY: 'cookie_consent_preferences',

    init() {
        if (!this.hasConsent()) {
            this.showBanner();
        } else {
            // Apply existing consents if needed
            // const prefs = this.getPreferences();
            // if (prefs.analytics) enableAnalytics();
        }
    },

    hasConsent() {
        return localStorage.getItem(this.KEY) !== null;
    },

    getPreferences() {
        const stored = localStorage.getItem(this.KEY);
        return stored ? JSON.parse(stored) : { necessary: true, analytics: false, marketing: false };
    },

    savePreferences(prefs) {
        localStorage.setItem(this.KEY, JSON.stringify(prefs));
        this.hideBanner();
        this.hideModal();
    },

    acceptAll() {
        const prefs = { necessary: true, analytics: true, marketing: true };
        this.savePreferences(prefs);
    },

    rejectAll() {
        const prefs = { necessary: true, analytics: false, marketing: false };
        this.savePreferences(prefs);
    },

    showBanner() {
        if (document.getElementById('cookie-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <h3>Çerez Tercihleri</h3>
                <p>Web sitemizdeki deneyiminizi geliştirmek için çerezler kullanıyoruz. "Tümünü Kabul Et" seçeneğine tıklayarak çerez kullanımını onaylayabilirsiniz veya "Ayarları Yönet" seçeneği ile tercihlerinizi düzenleyebilirsiniz. Detaylı bilgi için <a href="cerez-bildirimi.html" target="_blank">Çerez Bildirimi</a> sayfasına bakabilirsiniz.</p>
            </div>
            <div class="cookie-actions">
                <button id="btn-manage-cookies" class="btn-cookie-outline">Ayarları Yönet</button>
                <button id="btn-accept-necessary" class="btn-cookie-outline">Zorunlu Çerezleri Kabul Et</button>
                <button id="btn-accept-cookies" class="btn-cookie-primary">Tümünü Kabul Et</button>
            </div>
        `;

        document.body.appendChild(banner);

        // Events
        document.getElementById('btn-accept-cookies').addEventListener('click', () => this.acceptAll());
        document.getElementById('btn-accept-necessary').addEventListener('click', () => this.rejectAll()); // Reuses rejectAll which keeps necessary only
        document.getElementById('btn-manage-cookies').addEventListener('click', () => this.showModal());
    },

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.remove();
    },

    showModal() {
        this.hideBanner(); // Hide banner if open

        if (document.getElementById('cookie-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'cookie-modal';
        modal.className = 'cookie-modal-overlay';
        modal.innerHTML = `
            <div class="cookie-modal">
                <div class="cookie-modal-header">
                    <h3>Çerez Ayarları</h3>
                    <button id="btn-close-modal" class="close-modal">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <p>Hangi çerezlerin kullanılmasına izin vereceğinizi seçebilirsiniz.</p>
                    
                    <div class="cookie-option">
                        <div class="option-header">
                            <span>Zorunlu Çerezler</span>
                            <input type="checkbox" checked disabled>
                        </div>
                        <p class="option-desc">Sitenin temel işlevleri için gereklidir. Bu çerezler kapatılamaz.</p>
                    </div>

                    <div class="cookie-option">
                        <div class="option-header">
                            <span>Performans ve Analiz</span>
                            <input type="checkbox" id="chk-analytics">
                        </div>
                        <p class="option-desc">Sitenin nasıl kullanıldığını analiz etmemize ve geliştirmemize yardımcı olur.</p>
                    </div>

                    <div class="cookie-option">
                        <div class="option-header">
                            <span>Pazarlama ve Hedefleme</span>
                            <input type="checkbox" id="chk-marketing">
                        </div>
                        <p class="option-desc">Size ilgi alanlarınıza göre reklamlar göstermek için kullanılır.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="btn-save-preferences" class="btn-cookie-primary" style="width: 100%;">Tercihleri Kaydet</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Pre-fill form if existing prefs
        // const prefs = this.getPreferences();
        // if(prefs.analytics) document.getElementById('chk-analytics').checked = true;
        // if(prefs.marketing) document.getElementById('chk-marketing').checked = true; 
        // Default unchecked for fresh ask

        // Events
        document.getElementById('btn-close-modal').addEventListener('click', () => {
            this.hideModal();
            if (!this.hasConsent()) this.showBanner(); // Re-show banner if disabled without saving
        });

        document.getElementById('btn-save-preferences').addEventListener('click', () => {
            const prefs = {
                necessary: true,
                analytics: document.getElementById('chk-analytics').checked,
                marketing: document.getElementById('chk-marketing').checked
            };
            this.savePreferences(prefs);
        });
    },

    hideModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) modal.remove();
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
} else {
    CookieConsent.init();
}

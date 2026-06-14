// Blog Data
const blogPosts = {
    1: {
        title: "Gıda Kalitesinin Değerlendirilmesi",
        date: "10 Mart 2025",
        content: `
            <p>Gıda ürünlerinin kalitesini belirlemek, hem tüketici sağlığı hem de endüstriyel standartların korunması açısından kritik bir öneme sahiptir. Kalite, sadece ürünün fiziksel görünümü ile sınırlı değildir; duyusal, kimyasal ve mikrobiyolojik faktörlerin birleşimidir.</p>

            <h4>Duyusal Analiz Yöntemleri</h4>
            <p>Tüketicinin bir ürünü tercih edip etmeyeceğinin birinci belirleyicisi duyusal özelliklerdir. Renk, doku, tat ve koku gibi parametreler, duyusal analiz laboratuvarlarında eğitimli paneller tarafından değerlendirilir. Örneğin, bir zeytinyağının kalitesi sadece asit oranıyla değil, içerdiği meyvemsi aromalarla da ölçülür.</p>

            <h4>Fiziksel ve Kimyasal Analizler</h4>
            <p>Gıda maddelerinin besin değerini ve saflığını belirlemek için laboratuvar ortamında çeşitli testler uygulanır. Nem tayini, protein analizi, yağ asidi kompozisyonu gibi ölçümler, ürünün etiketinde yazan değerlerle uyumlu olup olmadığını kontrol eder. Bu süreç, gıda sahteciliğini önlemek adına da en güçlü silahtır.</p>

            <h4>Sonuç</h4>
            <p>Kaliteli bir gıda ürünü, tarladan çatala kadar uzanan titiz bir sürecin ürünüdür. Tüketicilerin bilinçlenmesi ve üreticilerin standartlara uyması, gıda güvenliği ekosisteminin temelini oluşturur.</p>
        `
    },
    2: {
        title: "Tüketim Alışkanlıkları ve Beslenme",
        date: "5 Şubat 2025",
        content: `
            <p>Modern yaşamın getirdiği hız, beslenme alışkanlıklarımızı köklü bir şekilde değiştirdi. Hazır gıdalara yönelim artarken, geleneksel sofra kültüründen uzaklaşma eğilimi gözlenmektedir. Bu durum, sadece bireysel sağlığı değil, toplumsal sağlık göstergelerini de etkilemektedir.</p>

            <h4>Değişen Tüketici Profili</h4>
            <p>Yeni nesil tüketiciler, gıda seçimlerinde daha bilinçli davranmaya çalışsa da, bilgi kirliliği ve pazarlama stratejileri kararlarını etkilemektedir. "Organik", "Doğal", "Katkısız" gibi etiketler, tüketicinin satın alma davranışını yönlendiren en önemli faktörler haline gelmiştir.</p>

            <h4>Sürdürülebilir Beslenme</h4>
            <p>Gelecek nesillere yaşanabilir bir dünya bırakmak için sadece sağlıklı değil, aynı zamanda sürdürülebilir beslenme modellerini benimsemeliyiz. Mevsiminde beslenme, yerel üreticiyi destekleme ve gıda israfını azaltma, bu modelin temel taşlarıdır.</p>

            <ul>
                <li>İşlenmiş gıdaların tüketimini azaltmak.</li>
                <li>Bitkisel kaynaklı proteinlere daha fazla yer vermek.</li>
                <li>Gıda okuryazarlığını artırmak.</li>
            </ul>

            <p>Bu adımlar, hem bireysel sağlığımızı korumak hem de gezegenimizin kaynaklarını verimli kullanmak için atabileceğimiz basit ama etkili adımlardır.</p>
        `
    },
    3: {
        title: "Gıda Güvenliği ve Mikrobiyal Analizler",
        date: "20 Ocak 2025",
        content: `
            <p>Gıda güvenliği, gıdaların tüketim anında tüketiciye zarar vermeyecek şekilde hazırlanması ve saklanması sürecidir. Bu sürecin en kritik aşamalarından biri ise mikrobiyal analizlerdir. Gözle görülmeyen tehlikeler, insan sağlığı için ciddi riskler oluşturabilir.</p>

            <h4>Patojen Tespiti</h4>
            <p>Salmonella, E. coli, Listeria gibi gıda kaynaklı hastalıklara yol açan patojenlerin tespiti, mikrobiyoloji laboratuvarlarının en önemli görevidir. Üretim hatlarından alınan numuneler, düzenli olarak analiz edilerek potansiyel kontaminasyon riskleri önceden belirlenir.</p>

            <h4>Hijyen Standartları ve Raf Ömrü</h4>
            <p>Bir ürünün raf ömrü, sadece fiziksel bozulma ile değil, mikrobiyal yükü ile de belirlenir. Soğuk zincirin korunması, doğru ambalajlama teknikleri ve hijyenik üretim koşulları, ürünün güvenli bir şekilde tüketiciye ulaşmasını sağlar.</p>

            <p>Gıda güvenliği bir seçenek değil, zorunluluktur. Üreticiden tüketiciye kadar herkesin bu zincirde bir sorumluluğu vardır.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Check if modal html exists, if not create it
    if (!document.getElementById('blogModal')) {
        createModalHTML();
    }

    const modal = document.getElementById('blogModal');
    const closeBtn = modal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalBody = document.getElementById('modalBody');

    // Add click event to all "Read More" buttons
    // We need to attach this to existing buttons in blog.html
    const readMoreButtons = document.querySelectorAll('.blog-read-more'); // We will add this class to buttons
    
    // Alternative: Select by href="#" and text content if we don't want to change HTML classes too much yet
    // But adding a class/ID is cleaner. Let's assume we added class 'blog-btn' or similar.
    // For now, let's select all btn-outline inside .card in blog.html
    const buttons = document.querySelectorAll('.card .btn-outline');

    buttons.forEach((btn, index) => {
        // Assign ID based on index (1, 2, 3) since we have a simple list
        const postId = index + 1;
        btn.setAttribute('data-id', postId);
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(postId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal(id) {
        const post = blogPosts[id];
        if (!post) return;

        modalTitle.textContent = post.title;
        modalDate.textContent = post.date; // Use the date from object, or we could parse from HTML
        modalBody.innerHTML = post.content;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

function createModalHTML() {
    const modalHTML = `
        <div id="blogModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title-box">
                        <h3 id="modalTitle">Blog Başlığı</h3>
                        <div class="modal-meta">
                            <i class="far fa-calendar-alt"></i> <span id="modalDate">Tarih</span> | 
                            <i class="far fa-user"></i> Aziz Çalışkan
                        </div>
                    </div>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body" id="modalBody">
                    <!-- Content goes here -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

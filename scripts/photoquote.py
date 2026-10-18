def photo_quote(img, alt, quote):
    return f'''
    <!-- ===================== Bild + Zitat (Platzhalter: später eigenes Foto und persönliches Zitat) ===================== -->
    <section class="photo-quote" aria-label="Zitat">
      <picture class="photo-quote__media">
        <source type="image/avif" srcset="/Bilder/stock/{img}-1200.avif 1200w, /Bilder/stock/{img}-2400.avif 2400w" sizes="100vw">
        <source type="image/webp" srcset="/Bilder/stock/{img}-1200.webp 1200w, /Bilder/stock/{img}-2400.webp 2400w" sizes="100vw">
        <img src="/Bilder/stock/{img}-2400.jpg" srcset="/Bilder/stock/{img}-1200.jpg 1200w, /Bilder/stock/{img}-2400.jpg 2400w" sizes="100vw" alt="{alt}" width="2400" height="1350" loading="lazy" decoding="async">
      </picture>
      <div class="container photo-quote__inner">
        <blockquote class="photo-quote__text reveal"><p>«{quote}»</p></blockquote>
      </div>
    </section>
'''

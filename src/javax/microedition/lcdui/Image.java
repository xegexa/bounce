package javax.microedition.lcdui;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import javax.imageio.ImageIO;

public class Image {

  static {
    ImageIO.setUseCache(false);
  }
  public final BufferedImage buf;
  private final int logicalW;
  private final int logicalH;

  private Image(BufferedImage buf) {
    this(buf, -1, -1);
  }

  private Image(BufferedImage buf, int logicalW, int logicalH) {
    this.buf = buf;
    this.logicalW = logicalW;
    this.logicalH = logicalH;
  }

  public static Image fromBufferedImage(BufferedImage buf) {
    return new Image(toArgb(buf));
  }

  public static Image fromBufferedImage(BufferedImage buf, int logicalW, int logicalH) {
    return new Image(toArgb(buf), logicalW, logicalH);
  }

  public static Image createImage(byte[] data, int offset, int len) {
    try {
      BufferedImage bi = ImageIO.read(new ByteArrayInputStream(data, offset, len));
      if (bi == null) {
        throw new IllegalArgumentException("bad image");
      }
      bi = toArgb(bi);
      return new Image(bi);
    } catch (IOException e) {
      throw new IllegalArgumentException(e);
    }
  }

  /**
   * Copy pixels into TYPE_INT_ARGB using {@code getRGB}/{@code setRGB} so data is fully
   * materialized (no Graphics2D / accelerated-image races) and colors match the default
   * sRGB color model (including alpha).
   */
  static BufferedImage toArgb(BufferedImage src) {
    int w = src.getWidth();
    int h = src.getHeight();
    BufferedImage dst = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
    if (w <= 0 || h <= 0) {
      return dst;
    }
    int[] row = new int[w];
    for (int y = 0; y < h; y++) {
      src.getRGB(0, y, w, 1, row, 0, w);
      dst.setRGB(0, y, w, 1, row, 0, w);
    }
    return dst;
  }

  /**
   * Mutable image with alpha. Uninitialized pixels are transparent — callers that rely on
   * an opaque base (e.g. full-screen compositing) should clear with an opaque color first.
   */
  public static Image createImage(int width, int height) {
    BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
    return new Image(bi);
  }

  public static Image createImage(Image source) {
    int rw = source.buf.getWidth();
    int rh = source.buf.getHeight();
    BufferedImage bi = new BufferedImage(rw, rh, BufferedImage.TYPE_INT_ARGB);
    Graphics2D g = bi.createGraphics();
    try {
      g.setComposite(java.awt.AlphaComposite.Src);
      g.drawImage(source.buf, 0, 0, null);
    } finally {
      g.dispose();
    }
    return new Image(bi, source.logicalW, source.logicalH);
  }

  /**
   * Loads an image from the classpath or filesystem (same behavior as the former ImageLoader).
   *
   * @return MIDP {@code Image}, or {@code null} if the resource is missing or invalid
   */
  public static Image createImage(String fileName) {
    if (fileName == null || fileName.isEmpty()) {
      return null;
    }
    byte[] data = readResourceBytes(fileName);
    if (data != null) {
      try {
        return createImage(data, 0, data.length);
      } catch (IllegalArgumentException e) {
        return null;
      }
    }
    return null;
  }

  private static byte[] readResourceBytes(String fileName) {
    try {
      ClassLoader cl = Image.class.getClassLoader();
      if (cl != null) {
        try (InputStream in = cl.getResourceAsStream(fileName)) {
          if (in != null) {
            return readStreamFully(in);
          }
        }
      }
      String absolute = fileName.startsWith("/") ? fileName : "/" + fileName;
      URL url = Image.class.getResource(absolute);
      if (url != null) {
        try (InputStream in = url.openStream()) {
          return readStreamFully(in);
        }
      }
      try (InputStream in = Image.class.getResourceAsStream(absolute)) {
        if (in != null) {
          return readStreamFully(in);
        }
      }
      File f = new File(fileName);
      if (f.isFile()) {
        try (InputStream in = new FileInputStream(f)) {
          return readStreamFully(in);
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

  private static byte[] readStreamFully(InputStream in) throws IOException {
    ByteArrayOutputStream buf = new ByteArrayOutputStream();
    byte[] chunk = new byte[8192];
    int n;
    while ((n = in.read(chunk)) != -1) {
      buf.write(chunk, 0, n);
    }
    return buf.toByteArray();
  }

  public int getWidth() {
    return logicalW >= 0 ? logicalW : buf.getWidth();
  }

  public int getHeight() {
    return logicalH >= 0 ? logicalH : buf.getHeight();
  }
}

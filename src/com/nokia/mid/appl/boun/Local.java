package com.nokia.mid.appl.boun;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Local {
  private static Local loc = null;

  private static DataInputStream dataInputStream = null;

  /** When true, strings come from {@link #FALLBACK} (no lang.* on classpath). */
  private static boolean langUnavailable = false;

  public static final String phoneLang = "xx";

  private static final String[] FALLBACK = new String[32];

  static {
    FALLBACK[0] = "Bounce";
    FALLBACK[1] = "Use %0U, %1U, and %2U to move.";
    FALLBACK[2] = "Back";
    FALLBACK[3] = "You win!";
    FALLBACK[4] = "Continue";
    FALLBACK[5] = "Back";
    FALLBACK[6] = "Game over";
    FALLBACK[7] = "High scores";
    FALLBACK[8] = "Instructions";
    FALLBACK[9] = "Level %U";
    FALLBACK[10] = "Level %U complete";
    FALLBACK[11] = "New game";
    FALLBACK[12] = "New best score!";
    FALLBACK[13] = "OK";
  }

  private static String replace(String paramString1, String paramString2, String paramString3) {
    int i = paramString1.indexOf(paramString2);
    return (i >= 0) ? (paramString1.substring(0, i) + paramString3 + paramString1.substring(i + paramString2.length())) : paramString1;
  }

  private static String applyParams(String str, String[] paramArrayOfString) {
    if (paramArrayOfString != null) {
      if (paramArrayOfString.length == 1) {
        str = replace(str, "%U", paramArrayOfString[0]);
      } else {
        for (int b = 0; b < paramArrayOfString.length; b++) {
          str = replace(str, "%" + b + "U", paramArrayOfString[b]);
        }
      }
    }
    return str;
  }

  private static String fallbackLine(int paramInt) {
    if (paramInt >= 0 && paramInt < FALLBACK.length && FALLBACK[paramInt] != null) {
      return FALLBACK[paramInt];
    }
    return "Err";
  }

  private static InputStream openLangStream() {
    String base = "lang." + phoneLang;
    String resPath = "res/" + base;
    InputStream in = Local.class.getResourceAsStream("/" + resPath);
    if (in != null) {
      return in;
    }
    in = Local.class.getResourceAsStream("/" + base);
    if (in != null) {
      return in;
    }
    ClassLoader cl = Local.class.getClassLoader();
    if (cl != null) {
      in = cl.getResourceAsStream(resPath);
      if (in != null) {
        return in;
      }
      in = cl.getResourceAsStream(base);
      if (in != null) {
        return in;
      }
    }
    cl = Thread.currentThread().getContextClassLoader();
    if (cl != null) {
      in = cl.getResourceAsStream(resPath);
      if (in != null) {
        return in;
      }
      in = cl.getResourceAsStream(base);
      if (in != null) {
        return in;
      }
    }
    in = ClassLoader.getSystemResourceAsStream(resPath);
    if (in != null) {
      return in;
    }
    return ClassLoader.getSystemResourceAsStream(base);
  }

  private static void initLangStreamIfNeeded() throws IOException {
    if (dataInputStream != null || langUnavailable) {
      return;
    }
    if (loc == null) {
      loc = new Local();
    }
    System.out.println("Load lang: lang." + phoneLang);
    InputStream raw = openLangStream();
    if (raw == null) {
      System.out.println("No lang." + phoneLang + " on classpath; using built-in English strings.");
      langUnavailable = true;
      return;
    }
    if (!raw.markSupported()) {
      raw = new BufferedInputStream(raw);
    }
    dataInputStream = new DataInputStream(raw);
    dataInputStream.mark(256 * 1024);
  }

  public static synchronized String getText(int paramInt) {
    return Local.getText(paramInt, null);
  }

  public static synchronized String getText(int paramInt, String[] paramArrayOfString) {
    try {
      initLangStreamIfNeeded();
      if (langUnavailable) {
        return applyParams(fallbackLine(paramInt), paramArrayOfString);
      }
      dataInputStream.skipBytes(paramInt * 2);
      short s = dataInputStream.readShort();
      dataInputStream.skipBytes(s - paramInt * 2 - 2);
      String str = dataInputStream.readUTF();
      try {
        dataInputStream.reset();
      } catch (IOException e) {
        dataInputStream.close();
        dataInputStream = null;
      }
      return applyParams(str, paramArrayOfString);
    } catch (Exception e) {
      e.printStackTrace();
      try {
        if (dataInputStream != null) {
          dataInputStream.close();
        }
      } catch (IOException ignored) {
      }
      dataInputStream = null;
      langUnavailable = true;
      return applyParams(fallbackLine(paramInt), paramArrayOfString);
    }
  }
}

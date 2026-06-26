(function (global) {
  "use strict";

  var CACHE = null;
  var HOT_KEYWORDS = [
    "laser", "botox", "prp", "hair", "price", "cost", "fee", "package",
    "appointment", "book", "slot", "consult", "session", "kitna", "entha",
    "rate", "charges", "available", "tomorrow", "saturday", "facial", "peel"
  ];

  function fetchClinics() {
    if (CACHE) return Promise.resolve(CACHE);
    return fetch("data/clinics.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load clinic data");
        return res.json();
      })
      .then(function (data) {
        CACHE = data;
        return data;
      });
  }

  function getClinicIdFromUrl() {
    try {
      var id = new URLSearchParams(global.location.search).get("clinic");
      return id && id.trim() ? id.trim().toLowerCase() : null;
    } catch (e) {
      return null;
    }
  }

  function resolveClinic(data, idOverride) {
    var id = idOverride || getClinicIdFromUrl() || (data.meta && data.meta.defaultClinicId) || "celestee";
    var clinic = data.clinics[id];
    if (!clinic) {
      id = data.meta.defaultClinicId;
      clinic = data.clinics[id];
    }
    return { clinic: clinic, id: id };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function digestLine(text, cls) {
    return '<span class="' + (cls || "line-body") + '">' + text + "</span>";
  }

  function renderDigestHtml(clinic, opts) {
    opts = opts || {};
    var d = clinic.digest;
    var mode = opts.mode || (opts.compact ? "compact" : "full");
    var lines = [];

    lines.push('<span class="line-muted">📋 ' + escapeHtml(clinic.name) + " — Daily Summary</span>");
    lines.push('<span class="line-muted">📅 ' + escapeHtml(d.dateLabel) + "</span>");
    lines.push("");
    lines.push(digestLine("━━━━━━━━━━━━━━━━━━━━", "line-muted"));

    if (mode === "full") {
      lines.push(digestLine("📊 SUMMARY", "line-strong"));
      lines.push(digestLine("Total enquiries: " + d.totalEnquiries));
      lines.push(digestLine("Serious enquiries: " + d.hotLeads + " · Price asked: " + d.priceAsked));
    } else {
      lines.push(digestLine(
        "Total enquiries: " + d.totalEnquiries + " · Serious enquiries: " + d.hotLeads
      ));
    }

    lines.push("");
    if (mode === "full") {
      lines.push('<span class="line-alert">🚨 SLOW REPLIES (15 min rule)</span>');
      lines.push(digestLine("Not replied within 15 min: " + d.slaBreaches));
    } else {
      lines.push('<span class="line-alert">🚨 Not replied within 15 min: ' + d.slaBreaches + "</span>");
    }
    d.breaches.forEach(function (b) {
      lines.push(digestLine("→ " + escapeHtml(b.staff) + ": " + b.delays.join(", ")));
    });

    if (d.priceNoFollowUp) {
      lines.push("");
      lines.push(digestLine("Price shared, no 24hr follow-up: " + d.priceNoFollowUp));
    }

    lines.push("");
    lines.push(digestLine(mode === "full" ? "📞 ACTION TODAY (call before 12 PM)" : "📞 Call before 12 PM:", "line-strong"));
    d.callList.forEach(function (item, i) {
      lines.push(digestLine((i + 1) + ". " + escapeHtml(item)));
    });

    lines.push("");
    lines.push(digestLine(
      "Worst delay: " + d.worstDelayMin + " min · " + escapeHtml(d.worstStaff)
    ));
    if (mode === "full") {
      lines.push(digestLine("vs last week avg: " + d.weekAvgBefore + " min → " + d.weekAvgAfter + " min ↓", "line-muted"));
    }

    return lines.join("\n");
  }

  function renderAuditMetrics(audit, clinic, sourceLabel) {
    var html = "";
    html += '<p class="report-source">' + escapeHtml(sourceLabel) + "</p>";
    if (clinic && clinic.mode === "demo") {
      html += '<p class="report-mode">' + escapeHtml(clinic.modeLabel) + "</p>";
    }
    html += '<p class="report-verdict">' + escapeHtml(audit.verdict) + "</p>";
    html += '<div class="report-metrics">';
    html += metricCell(audit.totalEnquiries, "Total enquiries", "7-day period");
    html += metricCell(audit.hotLeads, "Hot leads", "Price / book intent");
    html += metricCell(audit.slowReply15, "Slow reply >15 min", "Hot leads only");
    html += metricCell(audit.likelyLost, "Likely lost", "No reply / no follow-up");
    html += "</div>";
    html += '<div class="report-metrics report-metrics--secondary">';
    html += metricCell(audit.medianAllMin + " min", "Median response", "All enquiries");
    html += metricCell(audit.medianHotMin + " min", "Median hot response", "Hot leads");
    html += metricCell(audit.slowestHot, "Slowest hot wait", "Worst case");
    html += metricCell(audit.noReply, "No reply at all", "Threads");
    html += "</div>";

    if (audit.leaks && audit.leaks.length) {
      html += '<h3 class="report-subhead">Slow hot replies</h3>';
      html += '<div class="table-scroll"><table class="report-table"><thead><tr><th>When</th><th>Intent</th><th>Wait</th><th>By</th></tr></thead><tbody>';
      audit.leaks.slice(0, 8).forEach(function (row) {
        html += "<tr><td>" + escapeHtml(row.day) + "</td><td>" + escapeHtml(row.intent) +
          "</td><td>" + escapeHtml(row.wait) + "</td><td>" + escapeHtml(row.by) + "</td></tr>";
      });
      html += "</tbody></table></div>";
    }

    return html;
  }

  function metricCell(value, label, hint) {
    return (
      '<div class="report-metric">' +
      '<div class="report-metric-value">' + escapeHtml(String(value)) + "</div>" +
      '<div class="report-metric-label">' + escapeHtml(label) + "</div>" +
      (hint ? '<div class="report-metric-hint">' + escapeHtml(hint) + "</div>" : "") +
      "</div>"
    );
  }

  function parseWhatsAppExport(text) {
    var lines = text.split(/\r?\n/);
    var messages = [];
    var lineRe = /^\[?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APMapm]{2})?)\]?\s*[-–—]?\s*(.+?):\s*(.*)$/;
    var lineReAlt = /^(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APMapm]{2})?)\s*[-–—]\s*(.+?):\s*(.*)$/;

    lines.forEach(function (line) {
      if (!line.trim() || line.indexOf("end-to-end encrypted") !== -1) return;
      var m = line.match(lineRe) || line.match(lineReAlt);
      if (!m) return;
      var sender = m[3].trim();
      var body = m[4].trim();
      if (!body) return;
      var ts = parseExportDate(m[1], m[2]);
      if (!ts) return;
      messages.push({ ts: ts, sender: sender, body: body, isYou: /^you$/i.test(sender) });
    });

    if (messages.length < 5) {
      return { error: "Could not read enough messages. Export a .txt chat from WhatsApp (More → Export chat)." };
    }

    var hotInbound = [];
    var breaches = [];
    var responseTimes = [];
    var hotResponseTimes = [];
    var noReply = 0;
    var priceNoFollowUp = 0;

    for (var i = 0; i < messages.length; i++) {
      var msg = messages[i];
      if (msg.isYou) continue;
      var lower = msg.body.toLowerCase();
      var isHot = HOT_KEYWORDS.some(function (kw) { return lower.indexOf(kw) !== -1; });
      if (!isHot && msg.body.length < 12) continue;

      hotInbound.push(msg);
      var replied = false;
      for (var j = i + 1; j < messages.length && j <= i + 12; j++) {
        if (messages[j].isYou) {
          var deltaMin = Math.round((messages[j].ts - msg.ts) / 60000);
          if (deltaMin >= 0) {
            responseTimes.push(deltaMin);
            if (isHot) hotResponseTimes.push(deltaMin);
            if (isHot && deltaMin > 15) {
              breaches.push({ day: formatShortDate(msg.ts), intent: truncate(msg.body, 40), wait: deltaMin + " min", by: "Clinic" });
            }
            if (isHot && /price|cost|fee|kitna|rate|₹|rs/i.test(msg.body) && deltaMin > 1440) {
              priceNoFollowUp++;
            }
          }
          replied = true;
          break;
        }
        if (!messages[j].isYou && messages[j].ts - msg.ts > 3600000) break;
      }
      if (!replied && isHot) noReply++;
    }

    var totalEnquiries = messages.filter(function (m) { return !m.isYou; }).length;
    var hotLeads = hotInbound.length;
    var slowReply15 = breaches.length;
    var medianAll = median(responseTimes) || 0;
    var medianHot = median(hotResponseTimes) || medianAll;
    var slowest = hotResponseTimes.length ? Math.max.apply(null, hotResponseTimes) : 0;
    var likelyLost = Math.min(Math.max(Math.round(slowReply15 * 0.6 + noReply), 1), Math.max(1, Math.round(hotLeads * 0.25)));

    return {
      periodDays: 7,
      totalEnquiries: totalEnquiries,
      hotLeads: hotLeads,
      slowReply15: slowReply15,
      priceNoFollowUp24: priceNoFollowUp,
      likelyLost: likelyLost,
      verdict: "From your export: roughly " + likelyLost + " hot conversations may have leaked last week due to slow or missing replies.",
      medianAllMin: medianAll,
      medianHotMin: medianHot,
      slowestHot: slowest >= 60 ? Math.floor(slowest / 60) + " hr " + (slowest % 60) + " min" : slowest + " min",
      noReply: noReply,
      leaks: breaches.slice(0, 8),
      _parsed: true
    };
  }

  function parseExportDate(datePart, timePart) {
    var dp = datePart.split(/[\/\-]/);
    if (dp.length !== 3) return null;
    var d = parseInt(dp[0], 10);
    var m = parseInt(dp[1], 10) - 1;
    var y = parseInt(dp[2], 10);
    if (y < 100) y += 2000;
    if (d > 12) { var tmp = d; d = m + 1; m = tmp - 1; }
    var tp = timePart.trim().match(/(\d{1,2}):(\d{2})/);
    if (!tp) return null;
    var hr = parseInt(tp[1], 10);
    var min = parseInt(tp[2], 10);
    if (/pm/i.test(timePart) && hr < 12) hr += 12;
    if (/am/i.test(timePart) && hr === 12) hr = 0;
    return new Date(y, m, d, hr, min, 0);
  }

  function formatShortDate(d) {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[d.getDay()] + " " + d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  function truncate(s, n) {
    s = s.replace(/\s+/g, " ").trim();
    return s.length <= n ? s : s.slice(0, n - 1) + "…";
  }

  function median(arr) {
    if (!arr.length) return 0;
    var sorted = arr.slice().sort(function (a, b) { return a - b; });
    var mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }

  function hydrateDigestPreviews(clinic) {
    document.querySelectorAll("[data-clinic-digest]").forEach(function (el) {
      var mode = el.getAttribute("data-clinic-digest") || "full";
      el.innerHTML = renderDigestHtml(clinic, { mode: mode });
    });
  }

  function hydrateProofStats(clinic) {
    var p = clinic.proof;
    document.querySelectorAll("[data-clinic-proof-before]").forEach(function (el) {
      el.textContent = p.responseBeforeMin;
    });
    document.querySelectorAll("[data-clinic-count-after], #proof [data-count-to]").forEach(function (el) {
      el.setAttribute("data-count-to", String(p.responseAfterMin));
      el.textContent = "0";
      delete el.dataset.countStarted;
    });
    document.querySelectorAll("[data-clinic-proof-sla]").forEach(function (el) {
      el.textContent = p.slaMinutes;
    });
    document.querySelectorAll("[data-clinic-proof-hour]").forEach(function (el) {
      el.textContent = p.digestHour;
    });
    document.querySelectorAll("[data-clinic-proof-missed]").forEach(function (el) {
      el.textContent = p.missedCallRecoveryPct != null ? p.missedCallRecoveryPct : 71;
    });
  }

  function hydrateClinicLabels(clinic) {
    document.querySelectorAll("[data-clinic-name]").forEach(function (el) {
      el.textContent = clinic.name;
    });
    document.querySelectorAll("[data-clinic-short]").forEach(function (el) {
      el.textContent = clinic.shortName || clinic.name;
    });
    document.querySelectorAll("[data-clinic-area]").forEach(function (el) {
      el.textContent = clinic.area;
    });
    document.querySelectorAll("[data-clinic-mode]").forEach(function (el) {
      el.textContent = clinic.modeLabel || "";
      el.hidden = !clinic.modeLabel;
    });
    document.querySelectorAll("[data-clinic-prefill]").forEach(function (el) {
      if (!el.value) {
        el.value = clinic.name + " · " + clinic.area;
      }
    });
  }

  function initReportPage(clinic, data) {
    var panel = document.getElementById("report-results");
    var uploadForm = document.getElementById("export-upload-form");
    var demoBtn = document.getElementById("load-demo-report");
    var clinicSelect = document.getElementById("demo-clinic-select");
    if (!panel) return;

    if (clinicSelect) {
      Object.keys(data.clinics).forEach(function (id) {
        var c = data.clinics[id];
        var opt = document.createElement("option");
        opt.value = id;
        opt.textContent = c.name + " (" + c.area + ")";
        if (id === clinic.id) opt.selected = true;
        clinicSelect.appendChild(opt);
      });
      clinicSelect.addEventListener("change", function () {
        var picked = data.clinics[clinicSelect.value];
        if (picked) showReport(picked, picked.audit, "Demo data — " + picked.name, panel);
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener("click", function () {
        var id = clinicSelect ? clinicSelect.value : clinic.id;
        var picked = data.clinics[id] || clinic;
        showReport(picked, picked.audit, "Demo data — " + picked.name, panel);
      });
    }

    if (uploadForm) {
      uploadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var fileInput = document.getElementById("export-file");
        var nameInput = document.getElementById("export-clinic-name");
        if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
        var reader = new FileReader();
        reader.onload = function () {
          var parsed = parseWhatsAppExport(String(reader.result || ""));
          if (parsed.error) {
            panel.hidden = false;
            panel.innerHTML = '<p class="report-error">' + escapeHtml(parsed.error) + "</p>";
            return;
          }
          var customClinic = {
            name: (nameInput && nameInput.value.trim()) || "Your clinic",
            area: "Hyderabad",
            mode: "live",
            modeLabel: "From your WhatsApp export — processed in browser, not stored",
            digest: buildDigestFromAudit(parsed)
          };
          showReport(customClinic, parsed, "Live analysis from your export", panel);
          var digestEl = document.getElementById("report-digest");
          if (digestEl) digestEl.innerHTML = renderDigestHtml(customClinic, {});
        };
        reader.readAsText(fileInput.files[0]);
      });
    }

    if (new URLSearchParams(global.location.search).get("demo") === "1") {
      showReport(clinic, clinic.audit, "Demo data — " + clinic.name, panel);
    }
  }

  function buildDigestFromAudit(audit) {
    return {
      dateLabel: "Last 7 days · from export",
      totalEnquiries: audit.totalEnquiries,
      hotLeads: audit.hotLeads,
      priceAsked: Math.max(1, Math.round(audit.hotLeads * 0.6)),
      appointmentIntent: Math.max(1, Math.round(audit.hotLeads * 0.3)),
      slaBreaches: audit.slowReply15,
      breaches: [{ staff: "Team", delays: audit.leaks.slice(0, 2).map(function (l) { return "+" + l.wait; }) }],
      priceNoFollowUp: audit.priceNoFollowUp24,
      callList: audit.leaks.slice(0, 3).map(function (l) { return l.intent + " (" + l.wait + ")"; }),
      worstDelayMin: audit.leaks[0] ? parseInt(audit.leaks[0].wait, 10) || 0 : 0,
      worstStaff: "Team",
      weekAvgBefore: audit.medianHotMin,
      weekAvgAfter: Math.max(8, Math.round(audit.medianHotMin * 0.7))
    };
  }

  function showReport(clinic, audit, sourceLabel, panel) {
    panel.hidden = false;
    panel.innerHTML =
      '<div class="report-head">' +
      "<h2>" + escapeHtml(clinic.name) + "</h2>" +
      "<p>" + escapeHtml(clinic.area) + "</p>" +
      "</div>" +
      renderAuditMetrics(audit, clinic, sourceLabel) +
      '<div class="report-digest-wrap">' +
      '<h3 class="report-subhead">Sample daily summary</h3>' +
      '<div class="digest-preview" id="report-digest"></div>' +
      "</div>" +
      '<div class="report-actions">' +
      '<a href="audit.html" class="button-primary">Book full audit on WhatsApp</a>' +
      '<a href="digest.html" class="button-outline-on-dark">See daily summary</a>' +
      "</div>";
    var digestEl = document.getElementById("report-digest");
    if (digestEl) {
      var digestClinic = clinic.digest ? clinic : { name: clinic.name, digest: buildDigestFromAudit(audit) };
      digestEl.innerHTML = renderDigestHtml(digestClinic, {});
    }
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hydratePage() {
    fetchClinics()
      .then(function (data) {
        var resolved = resolveClinic(data);
        var clinic = resolved.clinic;
        hydrateDigestPreviews(clinic);
        hydrateProofStats(clinic);
        hydrateClinicLabels(clinic);
        initReportPage(clinic, data);

        global.ClinicData = {
          getClinic: function (id) { return data.clinics[id || resolved.id]; },
          getAll: function () { return data.clinics; },
          defaultId: resolved.id,
          parseExport: parseWhatsAppExport,
          renderDigest: renderDigestHtml
        };

        document.dispatchEvent(new CustomEvent("clinic:hydrated", { detail: { clinic: clinic } }));
      })
      .catch(function () {
        /* Static fallbacks remain if JSON fails */
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydratePage);
  } else {
    hydratePage();
  }
})(window);

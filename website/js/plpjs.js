var PLP, UiNavBottom, UiNavTop;
(function (n, t) {
  "use strict";
  (n.plpEvent = {
    filterClose: "plp.filter.close",
    filterDelete: "plp.filter.delete",
    filterOpened: "plp.filter.opened",
    filtersApplied: "plp.filters.applied",
    filtersUpdated: "plp.filters.updated",
    guidedNavUpdate: "plp.guidedNav.update",
    productListUpdated: "plp.productList.updated",
    sortApplied: "plp.sort.applied",
    toggleFacet: "plp.toggleFacet",
    updatePagination: "plp.update.pagination",
    updateSort: "plp.update.sort",
    updateUrl: "plp.update.url",
  }),
    (n.ModelPLP = n.Model.extend({
      init: function (i, r) {
        var l;
        this._super(i, r);
        var u = this,
          e = "",
          d,
          f = u.pageNumber,
          g = "page*" + f,
          c = JSON.parse(t("#plpHeaderData").text()),
          nt = c.hasAssociatedSearch,
          o = c.sort || "noSorting",
          b = c.title;
        (u.filtersShouldBeOpened = !1),
          (u.filters = {}),
          (u.isFirstState = !0),
          (u.isGuidedNavSearch =
            u.isSearchPage && n.location.href.indexOf("collID") > -1),
          (l = t("#plpBreadcrumbData")),
          (u.breadcrumbData =
            l.length > 0
              ? JSON.parse(l.text())
              : {
                  catLabel: [b, "", "", ""],
                  catId: ["" + u.categoryId, "", "", ""],
                });
        var k = function (n) {
            var t = u.get_filters_data();
            return (
              t === "" ? (t = n) : t.indexOf(n) === -1 && (t += "|" + n), t
            );
          },
          a = function (n) {
            var t = u.get_filters_data();
            return t === n
              ? ""
              : (t.indexOf(n) > -1 &&
                  ((t = t.replace(n, "")),
                  (t = t.replace("||", "|")),
                  t.substring(0, 1) === "|" && (t = t.substring(1)),
                  t.substring(t.length - 1) === "|" &&
                    (t = t.substring(0, t.length - 1))),
                t);
          },
          v = function (n) {
            var i = n.filters !== undefined && e !== n.filters,
              r = n.pgnt !== undefined && f !== n.pgnt,
              c = n.srt !== undefined && o !== n.srt,
              h;
            i &&
              ((e = n.filters),
              t("body").hasClass("is-desktop") &&
                ((h = u.convertFiltersInArray(n.filters)),
                h.forEach(function (n) {
                  var i = t("#filter_dimlist_" + n[0]).find(
                    '.filter-item[data-facetvalue="' + n[1] + '"]'
                  );
                  i.length === 0 && n[1] !== "1" && (e = a(n[0] + "*" + n[1]));
                })),
              y()),
              r && ((f = n.pgnt), p()),
              (o = n.srt),
              w(),
              i || r || c ? s() : (u.isFirstState = !1);
          },
          y = function () {
            u.$eventContainer.trigger(n.plpServiceEvent.filtersRequested);
          },
          p = function () {
            u.$eventContainer.trigger(n.plpEvent.updatePagination);
          },
          s = function () {
            u.$eventContainer.trigger(n.plpServiceEvent.productListRequested);
          },
          w = function () {
            u.$eventContainer.trigger(n.plpEvent.updateSort);
          },
          h = function () {
            u.$eventContainer.trigger(n.plpEvent.updateUrl);
          };
        (u.get_filters_data = function () {
          return e;
        }),
          (u.get_pagination_number = function () {
            return f;
          }),
          (u.get_sort_type = function () {
            return o;
          }),
          (u.add_filters_data = function (n) {
            u.set_filters_data(k(n));
          }),
          (u.remove_filters_data = function (n) {
            u.set_filters_data(a(n));
          }),
          (u.set_filters_data = function (n) {
            e !== n && ((e = n), (f = 1), y(), s(), h());
          }),
          (u.set_pagination_number = function (n) {
            f !== n && ((f = n), p(), s(), h());
          }),
          (u.set_plp_status = function (n) {
            v(n), h();
          }),
          (u.set_sort_type = function (n) {
            o !== n && ((o = n), (f = 1), w(), s(), h());
          }),
          (u.convertFiltersInArray = function (n) {
            return (
              (n = n.split("|")),
              n.forEach(function (t, i) {
                n[i] = t.split("*");
              }),
              n
            );
          }),
          (u.getDataReco = function (n) {
            var i = {},
              r;
            return (
              ["PLPSearchPage"].indexOf(n) > -1 &&
                ((i = {}),
                (r = []),
                t.each(contextInfo.Products, function (n, t) {
                  if (n < 3) r.push(t.ProductId);
                  else return;
                }),
                (i.$productId = r)),
              i
            );
          }),
          (u.isComparerTemplate = function (n) {
            for (var r = n.split("&"), i, t = 0; t < r.length; t++)
              if (((i = r[t].split("=")), i[0] == "isComparer" && i[1] == "1"))
                return !0;
            return !1;
          }),
          n.addEventListener("popstate", function (n) {
            n.state
              ? v(n.state)
              : console.error(
                  "Invalid operation : no state stored on popstate event detected"
                );
          });
      },
    }));
})(window, window.jQuery),
  (PLP = Page.extend({
    init: function (n, t, i) {
      var h, o, s, f;
      this._super(n, t, i);
      var r = this,
        i = r.Model,
        c = r.Tracking,
        u,
        e = !0;
      (r.$searchField = $("#header_search_field")),
        (h = function () {
          var n = $(".pl-title-corrected"),
            r = /vendor([0-9]+)/,
            t,
            i,
            u;
          return r.test(Utils.UrlManager.getUrlParameter("kwrd")) &&
            n.length > 0
            ? ((t = n.text()),
              n.hide(),
              (i = $("h1.pl-title")),
              (u = i.text().replace(r, t)),
              i.text(u),
              this.$searchField.val(t),
              $(".breadcrumb").first().find("li.active span").text(t),
              n.hide(),
              !0)
            : (n.show(), !1);
        });
      i.$eventContainer.on(window.plpEvent.updateUrl, function () {
        var n = window.location.href,
          o,
          r = i.get_filters_data(),
          f = i.get_pagination_number(),
          s = i.get_sort_type(),
          h = window.Utils.UrlManager.GetHashValue("srt", "&"),
          t = { filters: r, pgnt: f, srt: s };
        e &&
          (o = u.filters === t.filters && u.pgnt === t.pgnt && u.srt === t.srt),
          (e && o) ||
            ((e = !1),
            (n =
              r === ""
                ? Utils.UrlManager.removeHashFromUrl(n, "facets")
                : Utils.UrlManager.updateHashFromUrl(n, "facets", r)),
            (n = Utils.UrlManager.updateHashFromUrl(n, "srt", s)),
            (n =
              f === 1
                ? Utils.UrlManager.removeParameterFromUrl(n, "pgnt")
                : Utils.UrlManager.addOrChangeParameterFromUrl(n, "pgnt", f)),
            window.history.pushState(t, document.title, n));
      });
      i.$eventContainer.on(window.plpEvent.productListUpdated, function () {
        $("#productList")
          .find(".pl-product-link")
          .on("click", function () {
            var t = $(this),
              u = t.data("documentid"),
              n = t.attr("href"),
              r;
            n.indexOf("docid=") == -1 &&
              ((r = "?docid=" + u),
              (n = n.indexOf("#") > 0 ? n.replace("#", r + "#") : n + r)),
              (n =
                n.indexOf("#") !== -1
                  ? n.replace("#", window.location.hash + "&")
                  : n + window.location.hash),
              window.location.search.indexOf("pgnt") !== -1 &&
                (n =
                  n +
                  (n.indexOf("#") !== -1 ? "&" : "#") +
                  "pgnt=" +
                  i.get_pagination_number()),
              t.attr("href", n);
          });
        r.isPLPTech && r.addProductComparison();
      });
      $(".associated-search-link").each(function (n) {
        window.Utils.Common.onCustomClick($(this), function (t) {
          i.$eventContainer.trigger(
            window.globalTrackingEvent.SHOPPING_TOOL_USED,
            [
              {
                type: "SEARCH",
                subType: "Other",
                extraData: [n + 1, "associatedsearches"],
                keyword: $(t).find(".associated-search-txt").text(),
              },
            ]
          );
        });
      }),
        (u = {
          filters:
            window.Utils.UrlManager.GetHashValue("facets", "&") ||
            i.get_filters_data(),
          pgnt:
            parseInt(window.Utils.UrlManager.getUrlParameter("pgnt")) ||
            i.get_pagination_number(),
          srt:
            window.Utils.UrlManager.GetHashValue("srt", "&") ||
            i.get_sort_type(),
        }),
        window.history.replaceState(
          u,
          document.title,
          Utils.UrlManager.updateHashFromUrl(window.location.href, "srt", u.srt)
        ),
        i.set_plp_status(u),
        $(".fs-countdown").each(function () {
          var n = new UiFsCountDown(r, "UiFsCountDown", null, $(this));
        });
      $(".pl-banner-textimg-text").on("click", function () {
        $(this).addClass("seeAll");
      });
      if (
        ($("#productListHeader .associated-search-link").each(function () {
          $(this).attr(
            "data-cerberus",
            $(this).attr("data-cerberus").replace('"', "").replace('"', "")
          );
        }),
        $(".ecopart-link").length > 0)
      )
        $(".ecopart-link").on("click", function (n) {
          n.preventDefault(),
            n.stopPropagation(),
            $("#ecopartPopin").popin({ method: "open", trigger: $(this) });
        });
      if (
        i.keyword &&
        i.isSearchPage &&
        (r.$searchField.val(i.keyword),
        $("#eraseSearchButton").show(),
        labels.MobileV3_Common.SearchKeywordsCloseResultsLabel !== undefined)
      ) {
        for (
          o = labels.MobileV3_Common.SearchKeywordsCloseResultsLabel.split("|"),
            s = !1,
            f = 0;
          f < o.length;
          f++
        )
          if (i.keyword.indexOf(o[f]) !== -1) {
            s = !0;
            break;
          }
        s &&
          !$(".pl-title-corrected").length &&
          ($(".pl-title-container").prepend(
            '<div id="messageSearchCloseResult">' +
              labels.MobileV3_Common.SearchKeywordsCloseResultsMessage.replace(
                "|REPLACE|",
                i.keyword
              ) +
              "</div>"
          ),
          $(".pl-title").hide());
      }
      $(".guided-nav-item-3, .plp-nav-top a").click(function () {
        r.applyFiltersOnElement($(this));
      }),
        i.isSearchPage && h(),
        (this.CategoryId = t.CategoryId),
        (this.hasChildren = t.hasChildren),
        this.TranslatedKeyword,
        Utils.UrlManager.getUrlParameter("artcl") !== undefined &&
          Utils.Common.getCountryCode() === "ru-RU" &&
          (this.TranslatedKeyword = t.keyword),
        (this.Url = ""),
        (this.Keyword = ""),
        (this.isPLPTech = t.isPLPTech),
        (this.isSearchPage = t.isSearchPage),
        (this.isSerpPage = t.isSerpPage),
        this.showNotFound(),
        this.isPLPTech &&
          ((this.idProductObject = {}),
          (this.nbrProductComparison = 0),
          (this.productComparisonMax = r.isMobileDevice ? 2 : 4),
          this.addProductComparison(),
          $.each(r.idProductObject, function (n) {
            var t = $("#checkboxComparator_" + n);
            if (t.length > 0) {
              r.idProductObject[n].$close.on("click", function () {
                r.deleteThumbnail(n);
              });
              t.find(".comparator-checkbox").prop("checked", !0);
            }
          })),
        i.isComparerTemplate(window.location.search) &&
          $("a.guided-nav-item").each(function () {
            var t = $(this).attr("href").split("?"),
              n,
              i;
            t.length > 1 &&
              ((n = t[1].split("#")),
              (i = t[0] + "?" + n[0] + "&isComparer=1"),
              n.length > 1 && (i += "#" + n[1]),
              $(this).attr("href", i));
          });
    },
    UpdateProductNumber: function (n) {
      function i() {
        var t = labels.MobileV3_ProductItem.NumberOfArticles,
          i;
        return (
          n === 1 && (t = labels.MobileV3_ProductItem.NumberOfArticle),
          (i = "" + n),
          t.replace("[number]", i)
        );
      }
      var t =
        n < 2
          ? labels.MobileV3_ProductItem.NumberOfArticle
          : labels.MobileV3_ProductItem.NumberOfArticles;
      (t = t.replace("[number]", n.toString())),
        this.isMobileDevice || (t += " - "),
        this.isMobileDevice
          ? $("#ProductNumber").html(i())
          : $("#ProductNumber").html(i() + " - ");
    },
    addProductComparison: function () {
      var n = this,
        r = "pl-image",
        u = ".comparison-image",
        f = $(".comparator-checkbox"),
        l = $("#compareProduct"),
        o = "compareErrorMessage",
        t = $("#" + o),
        i;
      this.$containerImgComparison = $("#thumbnailsComparisonContainer");
      var s = function () {
          var t = [];
          $.each(n.idProductObject, function (n) {
            t.push(n);
          }),
            (window.location.href =
              n.$comparisonContainer.data("url") +
              "?prods=" +
              t.join(":") +
              "&catid=" +
              n.CategoryId);
        },
        h = function () {
          n.$comparisonContainer.show(500, function () {
            $(u).height($(u).width());
          });
        },
        a = function () {
          return t.length < 1
            ? $("<div />", {
                class: "tooltip",
                "data-position": "top",
                "data-show-close": !1,
                "data-temp": !0,
                "data-temp-duration": 3e3,
                id: o,
                text: labels.MobileV3_ProductItem.CompareTooltip,
              })
                .insertAfter(l)
                .tooltip("open")
                .parent()
                .css({ marginRight: "-30px", right: "50%", width: "300px" })
            : t.tooltip("open");
        },
        c = function () {
          if (t && t.data("tooltip")) return t.tooltip("close");
        },
        v = function (t) {
          var i, u;
          if (
            (Utils.StorageManager.EraseStorageValue("comparedProducts"),
            (i = t.attr("data-id")),
            t.is(":checked"))
          ) {
            if (
              (n.firstProduct
                ? ((n.firstProduct = !1),
                  (n.idProductObject[i] = { id: i }),
                  n.isMobileDevice ? t.after(e) : h())
                : n.nbrProductComparison <= 4
                ? ((n.idProductObject[i] = { id: i }),
                  n.isMobileDevice &&
                    ((u = $("#productListContainer")),
                    $("body").scrollTop(0),
                    u.addLoading(),
                    s(),
                    Utils.Common.isAppleDevice() &&
                      (setTimeout(function () {
                        u.removeLoading();
                      }, 2e3),
                      f.prop("checked", !1),
                      (n.idProductObject = {}),
                      e.detach())))
                : t.prop("checked", !1),
              n.isMobileDevice === !1)
            ) {
              (n.idProductObject[i].$imgProduct = t
                .closest("li")
                .find("." + r)
                .clone()),
                (n.idProductObject[
                  i
                ].$thumbnail = n.$containerImgComparison
                  .find(
                    "div:nth-child(" +
                      (n.nbrProductComparison + 1) +
                      ") .comparison-image"
                  )
                  .addClass("comparison-image-product-" + i)),
                (n.idProductObject[i].$currentCheckbox = t),
                (n.idProductObject[i].$close = $("<div>", {
                  class: "close close-product-comparison",
                  id: "closeProductComparison_" + i,
                  "data-id": i,
                })),
                n.idProductObject[i].$thumbnail.append(
                  n.idProductObject[i].$imgProduct[0],
                  n.idProductObject[i].$close
                );
              n.idProductObject[i].$close.on("click", function () {
                n.deleteThumbnail(i);
              });
              t.one("change", function () {
                $(this).is(":checked") || n.deleteThumbnail(i);
              });
              n.nbrProductComparison++;
            }
          } else n.isMobileDevice && ((n.idProductObject = {}), e.detach());
        },
        y = $("<div>", { class: "message-comparison" }),
        p = $("<span>", { class: "block title-message-comparison" }),
        w = $("<span>", { class: "block explanation-message-comparison" }),
        e = y.append(
          p.append(labels.MobileV3_ProductItem.ComparatorTitle),
          w.append(labels.MobileV3_ProductItem.ComparatorExplanation)
        );
      (this.firstProduct = !0),
        (this.$comparisonContainer = $("#containerComparison")),
        f.prop("checked", !1),
        n.isMobileDevice ||
          ((i = Utils.StorageManager.ReadStorageValue("comparedProducts")),
          i &&
            i.length > 0 &&
            ((n.idProductObject = {}),
            (n.nbrProductComparison = 0),
            $.each(i, function (t, i) {
              if (i.productId && i.imageUrl) {
                var f = i.productId,
                  e = $('.comparator-checkbox[data-id="' + f + '"]');
                if (
                  (e.length > 0 && e.prop("checked", !0),
                  (n.idProductObject[f] = { id: f }),
                  (n.idProductObject[f].$thumbnail = n.$containerImgComparison
                    .find(u)
                    .eq(t)
                    .addClass("comparison-image-product-" + f)),
                  n.idProductObject[f].$thumbnail.children("." + r).length <
                    1 &&
                    (n.idProductObject[f].$imgProduct = $("<img />", {
                      class: r,
                      src: i.imageUrl,
                    }).appendTo(n.idProductObject[f].$thumbnail)),
                  e.length > 0 &&
                    (n.idProductObject[f].$currentCheckbox = e.one(
                      "change",
                      function () {
                        $(this).is(":checked") || n.deleteThumbnail(f);
                      }
                    )),
                  n.idProductObject[f].$thumbnail.children(".close").length < 1)
                ) {
                  n.idProductObject[f].$close = $("<div>", {
                    class: "close close-product-comparison",
                    id: "closeProductComparison_" + f,
                    "data-id": f,
                  }).appendTo(n.idProductObject[f].$thumbnail);
                  n.idProductObject[f].$close.on("click", function () {
                    n.deleteThumbnail(f);
                  });
                }
                n.nbrProductComparison++;
              }
            }),
            n.nbrProductComparison > 0 && h()));
      f.on("change", function () {
        n.$containerImgComparison.find("img").length < n.productComparisonMax
          ? v($(this))
          : $(this).prop("checked", !1);
      });
      $("#comparisonDeleteAllProducts").on("click", function () {
        c(),
          $.each(n.idProductObject, function (t) {
            n.deleteThumbnail(t);
          });
      });
      $("#compareProduct").on("click", function () {
        n.$containerImgComparison.find(".comparison-image img").length > 1
          ? (c(), s())
          : a();
      });
    },
    deleteThumbnail: function (n) {
      var t = this,
        i = ".comparison-image";
      $("#checkboxComparator_" + n)
        .children(".comparator-checkbox")
        .prop("checked", !1),
        this.idProductObject[n].$thumbnail
          .closest(".thumbnail-comparison-image")
          .appendTo(t.$containerImgComparison)
          .children(i)
          .empty(),
        this.nbrProductComparison--,
        Utils.StorageManager.EraseStorageValue("comparedProducts"),
        this.nbrProductComparison <= 0 &&
          ((this.nbrProductComparison = 0),
          t.$comparisonContainer.hide(500),
          (t.firstProduct = !0)),
        $(i).removeClass("comparison-image-product-" + n),
        delete this.idProductObject[n];
    },
    applyFiltersOnElement: function (n) {
      var i = "&",
        e = "#",
        o = "facets",
        s = "srt",
        h = "href",
        r = Utils.UrlManager.GetHashValue(o, i),
        c = Utils.UrlManager.GetHashValue(s, i),
        u = n.attr(h),
        t,
        f;
      u !== undefined &&
        ((t = u),
        (f = u.indexOf("#")),
        r && ((t += f !== -1 ? i : e), (t += o + "=" + r)),
        c && ((t += f !== -1 || r ? i : e), (t += s + "=" + c)),
        n.attr(h, t));
    },
    showNotFound: function () {
      var n = $("#productNotFound");
      n.length > 0 &&
        Utils.UrlManager.GetHashValue("pdpnf") &&
        n.removeHidden();
    },
  })),
  (function (n, t) {
    "use strict";
    t(function () {
      if (t("#catList").length > 0) {
        var i,
          u = t("#catList"),
          r = u.find(".plp-cat"),
          n = t("#translations");
        n.length > 0 && (n = JSON.parse(n.text()));
        var f = t("#productModel").find(".product"),
          e = function (i) {
            t.each(i, function (i, r) {
              var e = t("<span>", {
                  class: "plp-cat-see-all see-all btn btn-sm btn-link bold",
                }),
                l = t('div[data-cat="' + i + '"]'),
                s = l.find(".plp-cat-title"),
                h = t("#cat-" + i),
                u = t(),
                a = s.attr("href"),
                c;
              e.text(n.SeeAll),
                s.append(e),
                r.forEach(function (n) {
                  var r = t("<li>", { class: "carousel-item" }),
                    i = f.clone(),
                    e,
                    s,
                    o;
                  r.prop("data-cerberus", "area_plpProduit_product1"),
                    i.find(".product-link").prop("href", n.Url),
                    t.isArray(n.Tags) &&
                      n.Tags.length > 0 &&
                      ((e = n.Tags[0].TagContent),
                      (s = n.Tags[0].TagType === 0),
                      s
                        ? i
                            .find(".product-info")
                            .prepend(
                              t("<div>", {
                                class: "product-sticker-top-left",
                                html: '<img src="' + e + '" />',
                              })
                            )
                        : i
                            .find(".product-info")
                            .prepend(
                              t("<div>", { class: "product-tag", html: e })
                            )),
                    i
                      .find(".product-brand")
                      .text(n.Brand)
                      .prop("data-cerberus", "lnk_plpProduit_brand1"),
                    i
                      .find(".product-title")
                      .text(n.Title)
                      .prop("data-cerberus", "lnk_plpProduit_productName1"),
                    i
                      .find(".product-price")
                      .text(n.FinalPrice)
                      .prop("data-cerberus", "txt_plpProduit_discountedPrice1"),
                    n.BasePrice !== undefined &&
                      n.BasePrice !== n.FinalPrice &&
                      i
                        .find(".product-original-price")
                        .text(n.BasePrice)
                        .show()
                        .prop("data-cerberus", "txt_plpProduit_normalPrice1"),
                    n.DiscountPercentage !== undefined &&
                      n.DiscountPercentage !== 0 &&
                      i
                        .find(".product-discount")
                        .text("-" + n.DiscountPercentage + "%")
                        .show(),
                    n.Tags.length > 0 &&
                      n.Tags.forEach(function (n) {
                        n.TagContent === "Go For Good";
                      }),
                    (o = t("<img>", {
                      src: "/images/PDP/placeholder_302.png",
                      class: "product-img",
                      "data-src": n.ProductImage,
                      "data-cerberus": "lnk_plpProduit_productImage1",
                      alt: n.Title,
                    }));
                  o.one("load", function () {
                    lzld(this);
                  });
                  i.find(".product-img").append(o), r.append(i), (u = u.add(r));
                }),
                h.append(u),
                (c = o(a)),
                h.append(c);
            }),
              setTimeout(function () {
                r.find(".carousel").carousel();
              }, 200);
          },
          o = function (n) {
            var r = t("<li>", { class: "carousel-item" }),
              u = t("<a>", { class: "carousel-see-all-link", href: n }),
              i = t("<div>", { class: "carousel-see-all-tile" }),
              f = t("<div>", { class: "carousel-see-all-tile-title" }),
              o = t("<div>", { class: "carousel-see-all-tile-arrow" }),
              e;
            if (
              labels &&
              labels.MobileV3_PLPCategories &&
              labels.MobileV3_PLPCategories.DiscoverSelection
            )
              e = labels.MobileV3_PLPCategories.DiscoverSelection;
            else return;
            return (
              f.text(e), i.append(f), i.append(o), u.append(i), r.append(u), r
            );
          },
          s = function (n) {
            var i = { req: n };
            t.ajax({
              url: "/categories/getproductsbycategory",
              async: !0,
              cache: !1,
              type: "post",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              data: JSON.stringify(i),
              success: function (n) {
                n.d != null && (n = n.d), e(n.Categories);
              },
              error: function () {
                console.error("/categories/getproductsbycategory HS");
              },
            });
          },
          h = function () {
            if (r.length > 0) {
              var n = [];
              return (
                r.each(function () {
                  var i = t(this);
                  n.push({
                    categoryId: i.data("cat"),
                    noOfProducts: i.data("numberofproducts") || 6,
                  });
                }),
                n
              );
            }
            return undefined;
          };
        (i = h()), i !== undefined && s(i);
      }
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    (n.plpServiceEvent = {
      filtersRequested: "service.filters.requested",
      filtersAnswered: "service.filters.answered",
      filtersSucceeded: "service.filters.succeeded",
      filtersFailed: "service.filters.failed",
      productListRequested: "service.loadproductlist.requested",
      productListAnswered: "service.loadproductlist.answered",
      productListSucceeded: "service.loadproductlist.succeeded",
      productListFailed: "service.loadproductlist.failed",
    }),
      (n.ServicesPLP = n.Services.extend({
        init: function (i, r) {
          this._super(i, r);
          var e = this,
            u = r.Model,
            f,
            h = function () {},
            o = function () {
              return t.ajax({
                async: !0,
                cache: !1,
                dataType: "json",
                url: "/showproductlist/getfilterslayerv2",
                type: "GET",
                data: {
                  catID: u.categoryId,
                  searchKeyword: u.keyword,
                  filter: u.get_filters_data(),
                  originalCatId: u.categoryId,
                  pageType: r.pageType,
                },
              });
            },
            s = function () {
              typeof f === varType.obj && (f.abort(), (f = undefined));
              var i = "";
              return (
                u.isComparerTemplate(n.location.search) &&
                  (i = "&isComparer=1"),
                (f = t.ajax({
                  async: !0,
                  cache: !1,
                  dataType: "json",
                  url:
                    "/serviceproductlist/loadproductlistV2?collectionId=" +
                    u.categoryId +
                    i +
                    "&searchQuery=" +
                    u.keyword +
                    "&facet=" +
                    encodeURI(u.get_filters_data()),
                  type: "POST",
                  data: {
                    collectionId: u.categoryId,
                    queryString: n.location.search,
                    sorting: u.get_sort_type(),
                    searchQuery: u.keyword,
                    pageNumber: u.get_pagination_number(),
                    facets: u.get_filters_data(),
                    pageType: r.pageType,
                  },
                }))
              );
            };
          u.$eventContainer.on(n.plpServiceEvent.filtersAnswered, function () {
            f = undefined;
          });
          e.initiateEvents(
            [
              ["filters", o],
              ["productList", s],
            ],
            n.plpServiceEvent
          );
        },
      }));
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.SHP = n.Page.extend({
      init: function (i) {
        var u, f;
        this._super(i),
          (u = this),
          (f = t(".shp")),
          u.country === "co.uk" && f.find('link[href*="bootstrap"]').remove();
        var e = t(".recommendations"),
          o = e[0],
          s = new n.MutationObserver(function (n) {
            t.each(n, function (n, t) {
              t.type === "childList" &&
                setTimeout(function () {
                  e.find(".link").off("click");
                }, 2e3);
            });
          });
        o && s.observe(o, { childList: !0 }),
          (n.setCookie = function () {}),
          (n.OpenQuickZoomFR = function () {});
      },
    });
  })(window, jQuery),
  (function (n) {
    "use strict";
    (n.trackingRule.PLP = {
      PRODUCT_LIST_UPDATE: "DC_PLP_OnChange[Sort/Filter/Page]",
    }),
      (n.TrackingPLP = n.Tracking.extend({
        init: function (t, i) {
          var s, f;
          this._super(t, i);
          var u = this,
            r = i.Model,
            c = u._track,
            l = u.storage_,
            a = n.trackingRule.PLP,
            v = "BackwardOrForward",
            e = !1,
            y = r.channel === "brand",
            o = !1,
            p = r.isSearchPage && !r.isGuidedNavSearch;
          r.breadcrumb.forEach(function (n) {
            n.isBrand === !0 && (o = !0);
          }),
            (s = !(p || y || o)),
            (f = function () {
              for (
                var t = r.breadcrumb, i = [], u = [], n = 0, f = t.length;
                n < f;
                n++
              )
                t[n].isCat === !1 ||
                  t[n].isKeyword === !0 ||
                  (t[n].isSubCat === !0
                    ? (u.push("SUBCAT_" + t[n].name),
                      i.push("SUBCAT_" + t[n].id))
                    : t[n].isBrand === !0
                    ? (u.push(
                        "B_" +
                          t[n].name.toLowerCase().trim().split(" ").join("-")
                      ),
                      i.push(
                        "B_" +
                          t[n].name.toLowerCase().trim().split(" ").join("-")
                      ))
                    : (u.push("CAT_" + t[n].name), i.push("CAT_" + t[n].id)));
              return [
                {
                  original_id: u.join("|"),
                  verb: "view-category",
                  type: "tag",
                },
                {
                  original_id: i.join("|"),
                  verb: "view-category-id",
                  type: "tag",
                },
              ];
            }),
            (u.displayTrackingEB = function () {
              return e ? f() : "No data send to EB";
            });
          r.$eventContainer.on(
            n.plpServiceEvent.productListSucceeded,
            function () {
              c(a.PRODUCT_LIST_UPDATE);
            }
          );
          if (r.isSerpPage && document.referrer.indexOf("laredoute") === -1)
            u.set_shoppingTool({
              type: "SEARCH",
              subType: "Internal",
              extraData: [0, "external"],
            });
          else if (r.isSearchPage) {
            var h = l.readLocalStorageValue(u.storageName.LAST_SEARCH_ID) || "",
              w = r.isGuidedNavSearch && h !== r.categoryId,
              b =
                !r.isGuidedNavSearch &&
                ("" + h).trim().toLowerCase() !==
                  r.keyword.trim().toLowerCase();
            (w || b) &&
              u.set_shoppingTool({
                type: "SEARCH",
                subType: v,
                extraData: [0],
              });
          }
          if (s)
            n.Utils.Common.onEarlyBirdsLoad(function () {
              (e = !0), n._ebq.push(["trackActivity", f()]);
            });
        },
      }));
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    var f = "facetvalue",
      e = "[data-" + f + "]",
      o = n.plpEvent.filterClose,
      h = "mfilter",
      i = "." + h,
      s = i + "-choice",
      r = "selected",
      u = "click";
    n.UiCategoryPanel = n.UiBloc.extend({
      init: function (h, c, l, a) {
        var v = this,
          y;
        v._super(h, c),
          (y = n.Utils.UrlManager.getUrlParameter("collID")),
          (v.hasChanged = !1),
          y && a.find(s + '[data-id="' + y + '"]').addClass(r),
          (v.originalFacet = a.find(s + "." + r));
        var p = a.find(i + "-apply"),
          k = a.find(i + "-return"),
          b = a.find(i + "-return.lr-button"),
          d = a.find(i + "-close");
        v.destroy = function () {
          a.sidePanel("destroy");
          var t = a.data("id");
          v.categoryPanels && v.categoryPanels[t] && delete v.categoryPanels[t],
            n.$eventContainer.off(o, w);
        };
        var w = function () {
            a.sidePanel("close");
          },
          g = function () {
            p.hide(), b.show();
          },
          nt = function () {
            b.hide(), p.show();
          },
          tt = function () {
            v.hasChanged ? nt() : g();
          },
          it = function (n) {
            (v.hasChanged =
              v.originalFacet.data(f) === n.data(f) || n.hasClass(r) ? !1 : !0),
              n.toggleClass(r);
          },
          rt = function (n) {
            it(n), tt();
          };
        n.$eventContainer.on(o, w);
        k.on(u, w);
        d.on(u, l.close);
        p.on(u, function () {
          if (v.hasChanged) {
            var u = window.Utils.UrlManager.GetHashValue("srt"),
              t = window.Utils.UrlManager.GetHashValue("facets"),
              i = a.find(e + "." + r).data(f);
            u
              ? ((i += "#srt=" + u), t && (i += "&facets=" + t))
              : t && (i += "#facets=" + t),
              (n.location.href = i);
          }
        });
        a.sidePanel()
          .on(u, i + "-category-choice", function (n) {
            n.preventDefault();
          })
          .on(u, e, function () {
            var n = t(this);
            a.find(e).not(n).removeClass(r),
              (!n.data("hasChildren") || n.data("nb-children") <= 1) && rt(n);
          });
        a.find(e).each(function (n, i) {
          var r = t(i);
          r.data("hasChildren") &&
            r.data("nb-children") > 1 &&
            l.openCategoryPanel(t(this), !1, r.data("parent-id"));
        });
      },
    });
  })(window, window.jQuery),
  (function (n) {
    "use strict";
    n.UiCheckboxFilter = n.UiBloc.extend({
      init: function (t, i, r, u) {
        var h = this;
        h._super(t, i, r);
        var e = !1,
          f = String(u.data("facet")),
          o = h.Model,
          s = u.find(".checkbox-filter-item"),
          c = s.attr("data-name"),
          l = function () {
            s.addSelected(), (e = !0), o.add_filters_data(f + "*1");
          },
          a = function () {
            o.filters[f] = {
              isCheckbox: !0,
              value: f + "*1",
              fullValue: f + "*1",
              text: c,
            };
          },
          v = function () {
            s.removeSelected(), (e = !1), o.remove_filters_data(f + "*1");
          };
        u.on("click", function () {
          e ? v() : l();
        });
        u.on(plpEvent.toggleFacet, function () {
          s.addSelected(), (e = !0), a();
        });
        o.$eventContainer.on(n.plpServiceEvent.filtersSucceeded, function () {
          o.filters[f] === undefined && ((e = !1), s.removeSelected());
        });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    var i,
      u = ".pl-image",
      o = ".plp-product-picture",
      r = ".pl-dim1",
      l = r + "-image",
      s = r + "-item",
      a = r + "-length",
      f = ".pl-colors",
      e = "productImageFromPLP",
      h = "documentid",
      c = "productid",
      v = "familycode";
    (n.UiColor = n.UiBloc.extend({
      init: function (y, p) {
        var w = this,
          b;
        w._super(y, p),
          (b = "data-location"),
          (w.loadColoursDelay = 500),
          (w.isThumbnailsDisplayable = !1),
          (i = ".pl-product-content"),
          (w.constructUrlWithColor = function (t) {
            var u = t.closest(i).children("a"),
              r = u.attr("href");
            (r = n.Utils.UrlManager.addOrChangeParameterFromUrl(
              r,
              "docid",
              t.data(h)
            )),
              (r = n.Utils.UrlManager.addOrChangeParameterFromUrl(
                r,
                "dim1",
                t.data("dim1")
              )),
              u.attr(b, r);
          }),
          (w.loadColors = function (r, u) {
            var e = r.find("#dim1Container_" + r.data(c));
            return t.ajax({
              url: "/ServiceProductList/loadcolours",
              type: "POST",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              data: u,
              success: function (t) {
                new n.ThumbnailsColor(y, "ThumbnailsColor", null, {
                  $container: e,
                  content: t.Html,
                  isDisplayable: w.isThumbnailsDisplayable,
                });
                var i = e.find(".active img");
                w.constructUrlWithColor(i);
                return;
              },
              complete: function () {
                e.removeLoading(), t(i).find(f).feedback("remove");
              },
            });
          });
        var k = function () {
            t(o)
              .on("mouseenter", function () {
                var n = t(this).find(r);
                t(r).children().addHidden(), n.children().removeHidden();
              })
              .on("mouseleave", function () {
                var n = t(this).find(r);
                n.children().addHidden();
              });
          },
          d = function () {
            t(i + " " + a).on("click", function () {
              t(this).closest(i).children().trigger("click");
            });
          },
          g = function () {
            t(i + " > a").on("click", function () {
              t(this).is("[" + b + "]")
                ? (t(this).attr("href", t(this).attr(b)),
                  localStorage.removeItem(e))
                : t(this).parent(i).data("has-colors") && r(t(this));
            });
            t(i + " > a").contextmenu(function () {
              r(t(this));
            });
            var r = function (t) {
              t.is("[" + b + "]")
                ? (t.attr("href", t.attr(b)), localStorage.removeItem(e))
                : t.parent(i).data("has-colors") &&
                  localStorage.setItem(
                    e,
                    n.Utils.UrlManager.getLastElementFromUrl(
                      t.find(u).attr("src")
                    )
                  );
            };
          },
          nt = function () {
            t(i).on("mouseenter", l, function () {
              var n = t(this);
              n.closest(r).find(s).removeActive(),
                n.parent().addActive(),
                it(n),
                w.constructUrlWithColor(n, n.data("dim1"));
            });
          },
          tt = function () {
            var e = function () {
              n.clearInterval(w.triggerColoursLoading),
                t(i).find(f).feedback("remove");
            };
            t(i + " .plp-product-picture")
              .on("mouseenter", function () {
                w.isThumbnailsDisplayable = !0;
                var s = t(this).closest(i),
                  y = s.find(r).children(),
                  l = 0,
                  a = 1;
                s.data("hasColors") === !0 &&
                  y.length === 0 &&
                  (s.find(f).feedback("add"),
                  (w.triggerColoursLoading = n.setInterval(function () {
                    l === a &&
                      w.loadColors(
                        s,
                        JSON.stringify({
                          request: {
                            DocumentId: s.data(h),
                            FamilyCode: s.data(v),
                            ImageUrl: s.find(o + " " + u).attr("src"),
                            ProductId: s.data(c),
                          },
                        })
                      ),
                      w.triggerColoursLoading && l > a && e(),
                      (l = l + 1);
                  }, w.loadColoursDelay)));
              })
              .on("mouseleave", function () {
                w.triggerColoursLoading && e(t(this).closest(i)),
                  (w.isThumbnailsDisplayable = !1);
              });
          },
          it = function (n) {
            var i = n.attr("src"),
              r = n.closest(".pl-picture"),
              o = r.closest(".pl-product"),
              u = t("<img>"),
              f = t("<div>", { class: "pl-product-secondary-img" }),
              e;
            (i = o.hasClass("pl-product-big")
              ? window.Utils.Common.formatImgUrl(i, 641)
              : window.Utils.Common.formatImgUrl(i, 362)),
              (e = r.find(".pl-product-secondary-img")),
              u.attr("src", i).appendTo(f);
            u.on("load", function () {
              e.remove();
            });
            r.append(f);
          };
        (w.enable = function () {
          tt(), k(), g(), nt(), d();
        }),
          w.enable();
      },
    })),
      (n.ThumbnailsColor = n.UiBloc.extend({
        init: function (n, r, f, e) {
          var o = this,
            c,
            y,
            l;
          o._super(n, r), t.extend(o, e);
          var h = t(e.content),
            p = o.$container.closest(i),
            a = function (n) {
              var t = n.attr("src").split("/");
              return t[t.length - 1].split(".")[0];
            },
            v = function (n) {
              return n.closest(s);
            };
          o.$container.empty().append(h),
            (c = o.$container.find("img")),
            o.isDisplayable ? h.removeHidden() : h.addHidden(),
            (y = a(p.find(u))),
            (l = v(c.first())),
            c.each(function (n, i) {
              var r = t(i);
              if (a(r) === y) {
                l = v(r);
                return;
              }
            }),
            l.addActive();
        },
      }));
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    var r = "lr-arrow-down",
      u = "lr-arrow-up",
      i = "filterid",
      f = "productcount",
      o = ["colourfamily"],
      e = 6,
      s = ["size-filter", "colourfamily-filter"],
      h = ["size", "brand", "colourfamily"],
      c = function (n) {
        var i = !1;
        return (
          t.each(s, function (t, r) {
            if (n.parent().hasClass(r)) {
              i = !0;
              return;
            }
          }),
          i
        );
      },
      l = function (n) {
        n.children().length === 0 &&
          t("<span>", {
            class: "filter-item-productcount",
            text: " (" + n.data(f) + ")",
          }).appendTo(n);
      },
      a = function (n) {
        c(n) === !1 ? l(n) : v(n);
      },
      v = function (n) {
        var t = "title";
        n.attr(t) === undefined &&
          n.attr(
            t,
            n
              .parent()
              .data("facettext")
              .toString()
              .replace(/\s\w/g, function (n) {
                return n.toUpperCase();
              })
              .replace(/^[a-z]/, function (n) {
                return n.toUpperCase();
              }) +
              " (" +
              n.data(f) +
              ")"
          );
      };
    n.UiFilter = n.UiBloc.extend({
      init: function (f, s, c, l) {
        this._super(f, s, c);
        var v = this,
          f = v.Page,
          y = v.Model,
          c = v.Parent,
          et = l.data("position"),
          at = et % e,
          b = l.data(i),
          g = {},
          k = [],
          p = !1,
          ot = l.data("exclfilter"),
          st = !0,
          nt = !1;
        v.hasSelected, (v.canBeHidden = et > e);
        var rt = l.find(".filter-submit"),
          ht = l.find(".filter-autocomplete"),
          d = l.find(".filter-item"),
          tt = l.find(".filter-list"),
          it = l.find(".filter-header"),
          ct = it.eq(0).find(".lr-arrow"),
          vt = t("#filterContainer").find(".filter").not(l),
          lt = function (n) {
            nt &&
              t.contains(l[0], t(n.target)[0]) === !1 &&
              (t(n.target).closest(".pl-product").parent().attr("id") !==
                "productList" &&
                p &&
                (ft(), y.set_filters_data(c.ExtractAllFilterValue())),
              w());
          },
          yt = function () {
            (p = !1),
              (v.hasSelected = !1),
              d.each(function () {
                var i = t(this),
                  n = i.isSelected();
                t(this).data("initiallySelected") !== n && (p = !0),
                  n && (v.hasSelected = !0),
                  v.hasSelected && p;
              }),
              bt(),
              wt();
          },
          w = function () {
            l.removeOpened(),
              ct.addClass(r).removeClass(u),
              tt.addHidden(),
              (nt = !1);
          },
          pt = function () {
            l.addOpened(),
              ct.addClass(u).removeClass(r),
              tt.removeHidden(),
              (nt = !0),
              l.trigger(n.plpEvent.filterOpened);
          },
          ut = function (n, i) {
            var u = n.isSelected(),
              h = n.data("initiallySelected"),
              f = n.data("facetvalue"),
              e = b + "*" + f,
              r,
              s,
              o;
            u
              ? (n.removeSelected(), delete g[e], k.push(e))
              : (n.addSelected(),
                b === "colourfamily"
                  ? (r = n.data("facettext"))
                  : ((r = n.clone()),
                    r.find(".filter-item-productcount").remove(),
                    (r = r.html())),
                (s = {
                  id: b,
                  facetValue: f,
                  value: b + "*" + f,
                  fullValue: b + "*" + f,
                  text: r,
                  title: l.data("name"),
                  isExcludeFilter: ot,
                }),
                (k = t.grep(k, function (n) {
                  return n !== e;
                })),
                (g[e] = s)),
              (u = !u),
              yt(),
              ot &&
                u &&
                ((o = n.siblings(".filter-item.selected")),
                o.length > 0 && ut(o)),
              i || ft();
          },
          wt = function () {
            v.hasSelected ? it.addSelected() : it.removeSelected();
          },
          bt = function () {
            var n = p ? "applyLabel" : "closeLabel";
            rt.text(rt.data(n));
          },
          ft = function () {
            k.forEach(function (n) {
              delete y.filters[n];
            }),
              (k = []),
              t.extend(y.filters, g),
              (g = {});
          };
        v.destroy = function () {
          t(n.document).off("click", lt),
            y.$eventContainer.off(n.plpEvent.sortOpened, w);
        };
        l.on(plpEvent.filterOpened, function () {
          var r = t(this).data(i),
            n = t(this).find(".filter-list-content");
          t.inArray(r, h) < 0 && st && n.width(n.width() + 40), (st = !1);
        });
        d.on("click", function () {
          ut(t(this), !0);
        });
        d.on(plpEvent.toggleFacet, function () {
          ut(t(this));
        });
        rt.on("click", function () {
          p && (ft(), y.set_filters_data(c.ExtractAllFilterValue())), w();
        });
        t(n.document).on("click", lt);
        it.on("click", function (n) {
          n.stopPropagation(), nt ? w() : pt();
        });
        vt.on(plpEvent.filterOpened, w);
        y.$eventContainer.on(n.plpEvent.sortOpened, w);
        if (ht.length > 0)
          ht.on("keyup", function () {
            var i = t(this),
              n = i.val();
            n.length > 0
              ? tt.find(".filter-item:not(.selected)").each(function (t, i) {
                  c.IsFilterIsTextFiltred(i, n);
                })
              : tt.find(".filter-item").show();
          });
        d.each(function () {
          var n = t(this),
            i = n.isSelected();
          n.data("initiallySelected", i), i && (v.hasSelected = !0);
        }),
          at === 0 && l.addClass("filter-right"),
          !f.isMobileDevice &&
            t.inArray(l.data(i), o) < 0 &&
            l
              .find(".filter-list-content")
              .mCustomScrollbar(
                t.extend({}, n.Utils.Enum.CustomScrollBar.DefaultParams, {
                  mouseWheel: { preventDefault: !0 },
                })
              ),
          d.find(".filter-item-value").each(function () {
            a(t(this));
          });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    var i = t("<span>", { class: "mfilter-tag" });
    n.UiFilterPanel = n.UiBloc.extend({
      init: function (i, r, u, f) {
        var o = this,
          d;
        o._super(i, r, u);
        var s = o.Model,
          u = o.Parent,
          e = f.data("filterid"),
          l = {},
          h = [],
          c = !1,
          v,
          w,
          y = f.find(".mfilter-apply"),
          g = f.find(".filter-autocomplete"),
          a = f.find(".mfilter-choice"),
          ut = f.find(".mfilter-close"),
          ft = f.find(".mfilter-return"),
          b = f.find(".mfilter-return.lr-button"),
          nt = f.find(".mfilter-panel-title"),
          et = function () {
            (c = !1),
              (v = !1),
              a.each(function () {
                var i = t(this),
                  n = i.isSelected();
                t(this).data("initiallySelected") !== n && (c = !0),
                  n && (v = !0),
                  v && c;
              }),
              tt();
          },
          p = function () {
            o.refreshPanelLink(), f.sidePanel("close");
          },
          tt = function () {
            c ? (b.hide(), y.show()) : (y.hide(), b.show());
          },
          it = function () {
            var n = window.innerHeight - 171;
            f.find(".mfilter-header").length > 0 &&
              ((n = n - 49),
              f.find(".mfilter-header").find(".mfilter-search").length > 0 &&
                (n = n - 45)),
              f.find(".mfilter-container").css("max-height", n + "px");
          },
          k = function (n, i) {
            var u = n.isSelected(),
              a = n.data("initiallySelected"),
              f = n.data("facetvalue"),
              r = e + "*" + f,
              c,
              o;
            u
              ? (n.removeSelected(),
                s.filters[r] !== undefined ? h.push(r) : delete l[r])
              : (n.addSelected(),
                (c = {
                  id: e,
                  facetValue: f,
                  value: e + "*" + f,
                  fullValue: e + "*" + f,
                  text:
                    e === "colourfamily"
                      ? n.data("facettext")
                      : e === "reviews"
                      ? n.html()
                      : n.text(),
                  title: nt.data("name"),
                  isExcludeFilter: w,
                }),
                s.filters[r] !== undefined
                  ? (h = t.grep(h, function (n) {
                      return n !== r;
                    }))
                  : (l[r] = c)),
              (u = !u),
              et(),
              w &&
                u &&
                ((o = n.siblings(".mfilter-choice.selected")),
                o.length > 0 && k(o)),
              i || rt();
          },
          rt = function () {
            h.forEach(function (n) {
              delete s.filters[n];
            }),
              (h = []),
              t.extend(s.filters, l),
              (l = {});
          };
        (o.destroy = function () {
          n.$eventContainer.off(plpEvent.filterClose, p),
            n.$eventContainer.off(
              plpEvent.filterDelete,
              o.removeUnvalidatedFilters
            ),
            f.sidePanel("destroy");
        }),
          (o.removeUnvalidatedFilters = function () {
            c &&
              (a.each(function () {
                var n = t(this);
                n.isSelected() &&
                s.filters[e + "*" + n.data("facetvalue")] === undefined
                  ? n.removeSelected()
                  : n.isSelected() ||
                    s.filters[e + "*" + n.data("facetvalue")] === undefined ||
                    n.addSelected();
              }),
              y.hide(),
              b.show()),
              (h = []),
              (l = {});
          }),
          (o.refreshPanelLink = function () {
            if (e !== undefined) {
              u.hideSelected(e);
              var n = Object.getOwnPropertyNames(s.filters);
              n.length > 0 &&
                n.forEach(function (n) {
                  n.startsWith(e) && u.displaySelected(e);
                });
            } else
              f.attr("id") === "sort" &&
                (s.get_sort_type() !== "noSorting"
                  ? (t("#openSort").addSelected(),
                    t("#openSort")
                      .find(".lr-arrow")
                      .addClass("lr-arrow-success"))
                  : (t("#openSort").removeSelected(),
                    t("#openSort")
                      .find(".lr-arrow")
                      .removeClass("lr-arrow-success")));
          });
        n.$eventContainer.on(plpEvent.filterClose, p);
        n.$eventContainer.on(plpEvent.filterDelete, o.removeUnvalidatedFilters);
        ft.on("click", p);
        ut.on("click", u.close);
        a.on("click", function () {
          k(t(this), !0);
        });
        a.on(plpEvent.toggleFacet, function () {
          k(t(this));
        });
        y.on("click", function () {
          c &&
            (rt(),
            s.set_filters_data(u.ExtractAllFilterValue()),
            n.$eventContainer.trigger(plpEvent.filtersApplied),
            p());
        });
        if (
          (window.addEventListener("resize", function () {
            d && window.clearTimeout(d),
              (d = window.setTimeout(function () {
                it();
              }, 400));
          }),
          g.length > 0)
        )
          g.on("keyup", function () {
            var i = t(this),
              n = i.val();
            n.length > 0
              ? f.find(".mfilter-choice:not(.selected)").each(function (t, i) {
                  u.IsFilterIsTextFiltred(i, n);
                })
              : f.find(".mfilter-choice").show();
          });
        (w = nt.data("exclfilter")),
          f.sidePanel(),
          a.each(function () {
            var n = t(this),
              i = n.isSelected();
            n.data("initiallySelected", i), i && (v = !0);
          }),
          tt(),
          it();
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    var i = "filter",
      r = "." + i,
      u = r + "-item",
      f = "selected";
    n.UiFilters = n.UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var f = this,
          e = f.Model;
        (f.ExtractAllFilterValue = function () {
          var n = "";
          return (
            typeof this.filtersString === varType.str
              ? (n = this.filtersString)
              : t.isArray(e.filters)
              ? (n = e.filters
                  .filter(function (n) {
                    return n.value.indexOf("categories") == -1;
                  })
                  .map(function (n) {
                    return n.value;
                  })
                  .join("|"))
              : t.each(e.filters, function (t, i) {
                  n += (n !== "" ? "|" : "") + i.value;
                }),
            n
          );
        }),
          (f.$filter = t("#filterContainer")),
          (f.$superContainer = f.$filter),
          (f.filters = []),
          (f.filtersSeparator = "|"),
          (f.loaded = ""),
          (f.CurrentCatId = i.CategoryId),
          (f.OriginalCatId = i.CategoryId),
          (f.filtersLayerUrl = "/showproductlist/getfilterslayer"),
          n.isMobileDevice && (u = ".mfilter-choice");
      },
      IsFilterIsTextFiltred: function (n, i) {
        var r = t(n);
        (i = i.replace(/\s+/g, " ").replace(/[&.]/g, "").toLowerCase()),
          r.data("facettext").toString().toLowerCase().indexOf(i) === -1
            ? r.removeClass("selected").hide()
            : r.show();
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiFiltersMain = n.UiFilters.extend({
      init: function (i, r) {
        this._super(i, r);
        var s = this,
          i = s.Page,
          e = s.Model,
          v = 6,
          o = !1,
          u = t("#filterContainer"),
          w = t(".filter-tool"),
          f = u.find("#showMoreFiltersButton"),
          h = t(f).find(".lr-arrow"),
          c = JSON.parse(t("#dataFilterMain").text()),
          l = function () {
            u.find(".filter").each(function () {
              var r = t(this);
              r.data("filter", new n.UiFilter(i, "filter", s, r));
            }),
              t("#checkboxFilters")
                .find(".checkbox-filter")
                .each(function () {
                  var r = t(this);
                  r.data("checkboxFilter") === undefined &&
                    r.data(
                      "checkboxFilter",
                      new n.UiCheckboxFilter(i, "checkboxFilter", s, r)
                    );
                }),
              (f = u.find("#showMoreFiltersButton")),
              (h = t(f).find(".lr-arrow"));
            f.on("click", function () {
              a();
            });
          },
          y = function (n, i) {
            return t('.filter[data-filterid="' + n + '"]').find(
              '.filter-item[data-facetvalue="' + i + '"]'
            );
          },
          p = function (i) {
            u.find(".filter").each(function () {
              var i = t(this).data("filter");
              typeof i === n.varType.obj && i.destroy();
            }),
              u.html(t(i).filter("#filterContainer").html()),
              (o = !1),
              t("#checkboxFilters").html(t(i).find("#checkboxFilters").html()),
              l(),
              (e.filters = {});
            var r = e.convertFiltersInArray(e.get_filters_data());
            r.forEach(function (n) {
              var r = t("#checkboxLRAndMe"),
                u = t("#checkboxGoForGood"),
                i;
              r.length > 0 && n[0] === String(r.data("facet"))
                ? r.trigger(plpEvent.toggleFacet)
                : u.length > 0 && n[0] === String(u.data("facet"))
                ? u.trigger(plpEvent.toggleFacet)
                : ((i = y(n[0], String(n[1]).toLowerCase())),
                  i.length > 0 &&
                    (i.data("initiallySelected", !0),
                    i.trigger(plpEvent.toggleFacet)));
            }),
              o ||
                u.find(".filter").each(function () {
                  var n = t(this).data("filter");
                  if (n.canBeHidden && n.hasSelected) return a(), !1;
                }),
              e.$eventContainer.trigger(n.plpEvent.filtersUpdated);
          },
          a = function () {
            var i = t(".filter-block.hidden"),
              n = t(".filter-block");
            o === !1
              ? (f
                  .find(".filter-show-more-button-text")
                  .text(c.lessFiltersText),
                h.addClass("lr-arrow-up").removeClass("lr-arrow-down"),
                i.each(function (n) {
                  t(i[n]).removeClass("hidden");
                }),
                (o = !0))
              : (f
                  .find(".filter-show-more-button-text")
                  .text(c.moreFiltersText),
                h.addClass("lr-arrow-down").removeClass("lr-arrow-up"),
                n.each(function (i) {
                  for (i = v; i < n.length; i++) t(n[i]).addClass("hidden");
                }),
                (o = !1));
          };
        e.$eventContainer.on(n.plpServiceEvent.filtersSucceeded, function (
          n,
          t
        ) {
          p(t.FiltersLayer);
        });
        l();
      },
      loadSort: function () {
        var n = "#sortMainContent",
          i = ".sort-content";
        t(n).find(i).length < 1 && t(i).appendTo(n).show();
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiFiltersMobile = n.UiFilters.extend({
      init: function (i, r) {
        var u = this,
          p,
          w,
          b;
        u._super(i, r);
        var i = u.Page,
          f = u.Model,
          it = !1,
          k = !1,
          ht = !1,
          d = f.keyword !== "",
          a = !1,
          l = !1,
          h = [],
          g,
          ct = "mfilter-element-visible",
          rt = "initiallySelected";
        (u.categoryPanels = {}),
          (u.categoryData = {}),
          (u.$filter = t("#filter"));
        var e = t("#filters"),
          c = t("#filtersPanelButton"),
          o,
          s,
          ut = function () {
            u.hideSelected(),
              (it = !0),
              f.set_plp_status({ filters: "", pgnt: 1, srt: "noSorting" });
          },
          ft = function () {
            o && s && (o.hide(), s.show());
          },
          v = function () {
            o && s && (s.hide(), o.show());
          },
          et = function (n, i) {
            return t('.apply-filter-panel[data-filterid="' + n + '"]').find(
              '.mfilter-choice[data-facetvalue="' + i + '"]'
            );
          },
          nt = function () {
            var n = window.innerHeight - 171;
            e.find(".mfilter-container").css("max-height", n + "px");
          },
          tt = function () {
            a
              ? (h.forEach(function (n) {
                  n.removeUnvalidatedFilters();
                }),
                Object.keys(f.filters).length > 0 ||
                f.get_sort_type() !== "noSorting"
                  ? ft()
                  : v())
              : ((l = f.filtersShouldBeOpened = !0),
                k ||
                  f.$eventContainer.trigger(
                    n.plpServiceEvent.filtersRequested
                  ));
          },
          ot = function () {
            d &&
              t("#filter_categories").length === 0 &&
              t("#openCategory").removeHidden();
          },
          y = function () {
            f.get_filters_data() === "" && f.get_sort_type() === "noSorting"
              ? c.removeClass("lr-capsule-small-success")
              : c.addClass("lr-capsule-small-success");
          },
          st = function (r) {
            var c, v;
            a &&
              (e.sidePanel("copyButtonOnParent"),
              h.forEach(function (n) {
                n.destroy();
              }),
              (h = []),
              g.destroy()),
              (c = t(r)),
              e.html(c),
              nt(),
              e.find(".apply-filter-panel").each(function () {
                h.push(new n.UiFilterPanel(i, "filterPanel", u, t(this)));
              }),
              (g = new n.UiCategoryPanel(
                i,
                "categoryPanel",
                u,
                e.find(".apply-category-panel")
              )),
              t("#checkboxFilters")
                .find(".checkbox-mfilter")
                .each(function () {
                  var r = t(this);
                  r.data("checkboxFilter") === undefined &&
                    r.data(
                      "checkboxFilter",
                      new n.UiCheckboxFilter(i, "checkboxFilter", u, r)
                    );
                }),
              (o = e.find("#seeProductsButton")),
              (s = e.find("#removeFiltersButton"));
            e.find(".mfilter-close").on("click", u.close);
            o.on("click", u.close);
            s.on("click", ut);
            (f.filters = {}),
              (v = f.convertFiltersInArray(f.get_filters_data())),
              v.forEach(function (n) {
                var r = t("#checkboxLRAndMe"),
                  u = t("#checkboxGoForGood"),
                  i;
                r.length > 0 &&
                String(n[0]) === String(r.parent().data("facet"))
                  ? r.trigger(plpEvent.toggleFacet)
                  : u.length > 0 &&
                    String(n[0]) === String(u.parent().data("facet"))
                  ? u.trigger(plpEvent.toggleFacet)
                  : ((i = et(n[0], String(n[1]).toLowerCase())),
                    i.length > 0 &&
                      (i.data(rt, !0), i.trigger(plpEvent.toggleFacet)));
              }),
              h.forEach(function (n) {
                n.refreshPanelLink();
              }),
              (a = !0),
              ot(),
              f.$eventContainer.trigger(n.plpEvent.filtersUpdated),
              l && ((l = !1), tt());
          };
        (u.close = function () {
          e.sidePanel("close"), n.$eventContainer.trigger(plpEvent.filterClose);
        }),
          (u.displaySelected = function (n) {
            t("#filter_" + n).addSelected(),
              t("#filter_" + n)
                .find(".lr-arrow")
                .addClass("lr-arrow-success");
          }),
          (u.hideSelected = function (n) {
            t("#filter_" + n).removeSelected(),
              t("#filter_" + n)
                .find(".lr-arrow")
                .removeClass("lr-arrow-success");
          });
        c.on("click", function () {
          tt();
        });
        f.$eventContainer.on(n.plpServiceEvent.filtersRequested, function () {
          (k = !0), e.addLoading(), l && c.feedback("add"), y();
        });
        f.$eventContainer.on(n.plpServiceEvent.filtersSucceeded, function (
          n,
          t
        ) {
          st(t.FiltersLayer), e.removeLoading(), c.feedback("remove");
        });
        f.$eventContainer.on(n.plpEvent.updateSort, function () {
          y(), v();
        });
        window.addEventListener("resize", function () {
          p && window.clearTimeout(p),
            (p = window.setTimeout(function () {
              nt();
            }, 400));
        }),
          e.sidePanel(),
          y(),
          (u.loadCategory = function (n, i) {
            var r = t.Deferred(),
              u;
            return (
              d &&
                ((u = { searchTerm: n }),
                i && (u.catId = i),
                t.ajax({
                  url: "/categories/GetSearchProductsForCategoryButton",
                  type: "GET",
                  cache: !1,
                  data: u,
                  success: function (n) {
                    r.resolve(n);
                  },
                  error: function (n, t, i) {
                    r.reject(n, t, i),
                      console.error(
                        "AJAX on " +
                          this.url +
                          ", method: " +
                          this.type +
                          ", status: " +
                          n.status +
                          ", statusText: " +
                          n.statusText +
                          ", error: " +
                          i
                      );
                  },
                })),
              r.promise()
            );
          }),
          (w = function (n, i, r) {
            r = r || !1;
            var f,
              u =
                n.HasChildren &&
                n.Children !== null &&
                n.Children.length > 1 &&
                !r;
            return (f = t("<li />", {
              class: u
                ? "mfilter mfilter-choice text-nowrap"
                : "mfilter-choice text-nowrap",
              "data-facettext": n.Name,
              "data-facetvalue":
                "/psrch/psrch.aspx?kwrd=" + i + "&collID=" + n.ID,
              "data-has-children": r ? !1 : n.HasChildren,
              "data-id": n.ID,
              "data-parent-id": n.ParentID,
              "data-nb-children": u ? n.Children.length : 0,
              html:
                '<span class="' +
                (u
                  ? "mfilter-label mfilter-category-name"
                  : "mfilter-category-name") +
                '">' +
                (r
                  ? labels.MobileV3_ProductItem.AllResults +
                    " " +
                    n.Name.toLowerCase()
                  : n.Name) +
                '</span> <span class="mfilter-category-noOfProducts">(' +
                n.NoOfProducts +
                ")</span>" +
                (u
                  ? '<span class="lr-arrow lr-arrow-right"></span>'
                  : '<span class="lr-tick lr-tick-light-success"></span>'),
            }).prop("outerHTML"));
          }),
          (b = function (r, f, e) {
            var h = "",
              o = r.data("id") || 0,
              l = ".mfilter-choice[data-id='" + o + "']",
              a = e.ChildrenList,
              s,
              c;
            return (
              o === 0 && ((a = e.ParentList), (l = "#openCategory")),
              (s = "categoryFilter-" + o),
              t("#" + s).length < 1 &&
                ((c = e.ParentList[e.CurrentCategoryIndex]),
                c != undefined && o !== 0 && (h += w(c, f, !0)),
                t.each(a, function () {
                  h += w(this, f);
                }),
                r
                  .append(
                    '<div id="' +
                      s +
                      '" class="mfilter-panel apply-category-panel" data-trigger="' +
                      l +
                      '" data-from="bottom" data-sticked-btn=".pl-filters-capsules" data-sticked-btn-position="top" data-parent="' +
                      r.closest(".mfilter-panel").attr("id") +
                      '"><div class="mfilter-header"><span class="mfilter-return lr-icon lr-icon-back"></span><div class="mfilter mfilter-panel-title text-nowrap"><span class="mfilter-label">' +
                      r.find(".mfilter-category-name").text() +
                      '</span></div></div><div class="mfilter-container"><ul class="clearfix mfilter-panel-content mfilter-panel-categories"></ul></div><div class="mfilter-footer"><button class="mfilter-apply lr-button lr-button-block" data-cerberus="button_plpProduit_filter1_apply1" style="display: none;">' +
                      t(".mfilter-footer .mfilter-apply").first().text() +
                      '</button><button class="mfilter-return lr-button lr-button-block">' +
                      t(".mfilter-footer .mfilter-return").first().text() +
                      "</button></div></div>"
                  )
                  .find(".apply-category-panel .mfilter-panel-content")
                  .append(h),
                (u.categoryPanels[o] = new n.UiCategoryPanel(
                  i,
                  "categoryPanel",
                  u,
                  r.find(".apply-category-panel")
                ))),
              t("#" + s)
            );
          }),
          (u.openCategoryPanel = function (i, r, f) {
            f = f || 0;
            var e = t.Deferred(),
              c = n.Utils.UrlManager,
              o = u.Model.keyword || c.getUrlParameter("artcl"),
              h = r ? 0 : i.index(),
              s = !1;
            return (
              u.categoryData[f] && (s = u.categoryData[f][h]),
              s
                ? e.resolve(b(i, o, s))
                : (i.feedback("add"),
                  u
                    .loadCategory(o, i.data("id"))
                    .then(
                      function (n) {
                        u.categoryData[f] || (u.categoryData[f] = {}),
                          (u.categoryData[f][h] = n),
                          n.ParentList.length > 0 && e.resolve(b(i, o, n));
                      },
                      function (n, t, i) {
                        e.reject(n, t, i);
                      }
                    )
                    .always(function () {
                      i.feedback("remove");
                    })),
              e.promise()
            );
          });
        f.$eventContainer.on(n.plpEvent.filtersUpdated, function () {
          u.openCategoryPanel(t("#openCategory"), !0);
        });
        n.$eventContainer.on(plpEvent.filtersApplied, function () {
          v();
        });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiGuidedNav = UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var c = this,
          u = c.Model,
          f = ".guided-nav-item-hidden",
          e = n.globalTrackingEvent.SHOPPING_TOOL_USED,
          o = t(".guided-nav-item"),
          l = t(f),
          s = t(".guided-nav-show-more"),
          h = function (n) {
            var t = o.filter('[data-id="' + n.Id + '"]');
            n.NoOfProducts > 0 &&
              (t
                .find(".guided-nav-item-number")
                .text("(" + n.NoOfProducts + ")"),
              t.addAvailable().show(),
              n.Children.length > 0 &&
                n.Children.forEach(function (n) {
                  h(n);
                }));
          },
          a = function (n) {
            o.hide().removeAvailable(),
              s.hide(),
              l.hide(),
              n.forEach(function (n) {
                h(n);
              }),
              t(".guided-nav-list").each(function (n, i) {
                var r = t(i);
                r.find(f).first().find(".guided-nav-item").isAvailable() &&
                  r.find(".guided-nav-show-more").show();
              });
          };
        s.length > 0 &&
          s.each(function () {
            t(this)
              .find("button")
              .on("click", function () {
                var n = t(this).closest("li");
                n.siblings(f).slideDown(), n.slideUp();
              });
          });
        t(".guided-nav-item").on("click", function () {
          var n = t(this).data("level"),
            i = t(this).data("id"),
            r = t(this).data("name");
          Utils.StorageManager.CreateStorageValue(
            "OmnitureEntry_eVar97",
            n + "_" + i + "_" + r
          );
        });
        o.each(function () {
          var r = t(this);
          n.Utils.Common.onCustomClick(r, function () {
            u.isSearchPage || u.isSerpPage
              ? u.$eventContainer.trigger(e, [
                  {
                    type: "SEARCH",
                    subType: "Other",
                    extraData: [r.data("level"), "guidednav-search"],
                    guidedNavId: r.data("id"),
                  },
                ])
              : u.channel === "opeco" && n.wa_data.eVar72 !== undefined
              ? u.$eventContainer.trigger(e, [
                  {
                    type: "INTERNAL",
                    subType: "VentesFlash",
                    extraData: "guidednav-VF",
                  },
                ])
              : u.$eventContainer.trigger(e, [
                  {
                    type: "TREE",
                    subType: "GuidedNav",
                    extraData: [
                      r.data("level"),
                      r.text().trim().toLowerCase().replace(/ /g, "-"),
                    ],
                  },
                ]);
          });
        });
      },
    });
  })(window, jQuery),
  (UiNavBottom = UiBloc.extend({
    init: function (n, t) {
      var i = this;
      i._super(n, t),
        (i.openedClass = "opened"),
        (i.closedClass = "closed"),
        (i.blockIdSelector = "#plpNavBottom"),
        (i.dataIdSelector = i.blockIdSelector + "NavScript"),
        (i.itemClass = "plp-nav-bottom-item"),
        (i.hiddenItemClass = i.itemClass + "-hidden"),
        (i.noChildrenClass = "no-children"),
        (i.dataCategoryId = "categoryId"),
        (i.dataCategoryLevel = "categoryLevel"),
        (i.listTag = "ul"),
        (i.listItemTag = "li"),
        (i.listItemMainEvent = "click"),
        (i.maxCategoryLevel = 2),
        (i.toggleSeeMoreDuration = 400),
        (i.brandId = i.getBrandId()),
        (i.data = i.getData()),
        $("." + i.itemClass + "-1").click(function () {
          i.loadLevel1Children(this);
        }),
        i.toggleItems(),
        i.toggleSeeMore();
    },
    getBrandId: function () {
      var n = Utils.UrlManager.getUrlParameter("brndid");
      return typeof n == "undefined" ? "" : n;
    },
    getData: function () {
      return $(this.dataIdSelector).length > 0
        ? $.parseJSON($(this.dataIdSelector).text())
        : {};
    },
    getItemClass: function (n, t) {
      return (t = t || "-"), [this.itemClass, parseInt(n) + 1].join(t);
    },
    getLinkTemplate: function (n, t) {
      var i = this;
      return ((t = t || 1), typeof n == "object")
        ? $("<a />", {
            class: i.itemClass + " " + i.getItemClass(t - 1),
            "data-category-id": n.ID,
            "data-category-level": t,
            href: n.Url,
            text: n.Name,
          })
        : "";
    },
    linkHasCategories: function (n) {
      return $.isArray(n) && n.length > 0;
    },
    loadLevel1Children: function (n) {
      var t = this,
        r = n instanceof $ ? n : $(n),
        i;
      r.next(t.listTag).children().length <= 0 &&
        ((i = r.data("categoryId")),
        t.loadChildrenCategories({
          brandId: t.brandId,
          categoryId: i,
          childrenVisibleOnLoad: !1,
          feedback: !0,
          gotoCategory: function () {
            return;
          },
          link: $("." + t.itemClass + '[data-category-id="' + i + '"]'),
        }));
    },
    loadChildrenCategories: function (n) {
      var i = this,
        r = { childrenVisibleOnLoad: !0, feedback: !1 },
        t = $.extend(r, n);
      return $.ajax({
        dataType: "JSON",
        url:
          "/categories/getchildcategoriesforcurrentcat?catid=" +
          t.categoryId +
          "&brandId=" +
          t.brandId,
        beforeSend: function () {
          t.feedback && t.link.feedback(Utils.Enum.Feedback.Actions.add);
        },
        error: function () {
          t.link.addClass(i.noChildrenClass), t.gotoCategory();
        },
        success: function (n) {
          var r, u, f;
          n.IsSuccess
            ? ((r = t.link.parent()),
              (u = function (n, t, r) {
                $("<" + i.listItemTag + " />")
                  .html(i.getLinkTemplate(t, r))
                  .appendTo(n.children(i.listTag));
              }),
              $("<" + i.listTag + " />")
                .hide()
                .appendTo(r),
              i.linkHasCategories(n.Categories)
                ? ((f = t.link.data(i.dataCategoryLevel) + 1),
                  $.each(n.Categories, function (n, t) {
                    u(r, t, f);
                  }),
                  t.childrenVisibleOnLoad && i.toggleChildrenList(t.link))
                : t.link.addClass(i.noChildrenClass),
              t.link.feedback(Utils.Enum.Feedback.Actions.remove))
            : t.gotoCategory();
        },
        complete: function () {
          t.link.feedback(Utils.Enum.Feedback.Actions.remove);
        },
      });
    },
    toggleChildrenList: function (n) {
      var t = this;
      if (n.hasClass(t.itemClass + "-1"))
        return n.next(t.listTag).is(":visible")
          ? n.removeClass(t.openedClass).next(t.listTag).hide()
          : ($("." + t.itemClass)
              .removeClass(t.openedClass)
              .next(t.listTag)
              .hide(),
            n.addClass(t.openedClass).next(t.listTag).show());
    },
    toggleItems: function () {
      var n = this;
      $(n.blockIdSelector).on(n.listItemMainEvent, "." + n.itemClass, function (
        t
      ) {
        var i = $(t.currentTarget);
        t.preventDefault();
        var f = i.parent().children(n.listTag).length > 0,
          r = i.data(n.dataCategoryId),
          u = function () {
            var n = i.attr("href");
            return n
              ? (i.feedback(Utils.Enum.Feedback.Actions.add),
                $(location).attr(
                  "href",
                  n.replace(/(\#.*)/, "") +
                    "#shoppingtool=treestructureflyoutbottom"
                ),
                !0)
              : !1;
          };
        if (
          i.data(n.dataCategoryLevel) >= n.maxCategoryLevel ||
          i.hasClass(n.noChildrenClass)
        )
          return u(), !1;
        f ||
          r === undefined ||
          n.loadChildrenCategories({
            brandId: n.brandId,
            categoryId: r,
            feedback: !0,
            gotoCategory: function () {
              return u();
            },
            link: i,
          }),
          n.toggleChildrenList(i);
      });
    },
    toggleSeeMore: function () {
      var n = this;
      return $(n.blockIdSelector + " .plp-nav-bottom-more").click(function (t) {
        return (
          t.preventDefault(),
          $(this)
            .html(function (t, i) {
              return n.toggleSeeMoreLabel(i);
            })
            .closest(n.listTag)
            .find(n.listItemTag + "." + n.itemClass + "-hidden")
            .toggle({ duration: n.toggleSeeMoreDuration }),
          !1
        );
      });
    },
    toggleSeeMoreLabel: function (n) {
      return n === this.data.readmore.labels.more
        ? this.data.readmore.labels.less
        : this.data.readmore.labels.more;
    },
  })),
  (UiNavTop = UiBloc.extend({
    init: function (n, t) {
      var i = this;
      i._super(n, t),
        (i.navLinkBlockSelector = ".plp-nav-top"),
        (i.navLinkSelector = i.navLinkBlockSelector + " a"),
        (i.navLink = $(i.navLinkSelector)),
        (i.navLinkActiveClass = "active"),
        (i.navLinkActiveScrollDuration = 400),
        i.navLink.each(function (n, t) {
          i.activateCurrentCategoryButton(t);
        }),
        i.gotoCurrentCategoryButton();
    },
    activateCurrentCategoryButton: function (n) {
      var t = $(n),
        i = "href";
      t
        .attr(i)
        .replace(/(\?.*)/, "")
        .replace(/(\#.*)/, "") === document.location.pathname &&
        t.removeAttr(i).addClass(this.navLinkActiveClass);
    },
    getActiveButton: function () {
      return $(this.navLinkSelector + "." + this.navLinkActiveClass);
    },
    getActiveButtonScrollLeft: function () {
      var n = this.getActiveButton();
      return n.offset().left - ($("body").width() - n.outerWidth(!0)) / 2;
    },
    gotoCurrentCategoryButton: function () {
      this.hasActiveButton() &&
        this.scrollToActiveButton(this.getActiveButtonScrollLeft());
    },
    hasActiveButton: function () {
      return this.getActiveButton().length > 0;
    },
    scrollToActiveButton: function (n) {
      n > 0 &&
        $(this.navLinkBlockSelector).animate(
          { scrollLeft: n },
          this.navLinkActiveScrollDuration
        );
    },
  })),
  (function (n, t) {
    "use strict";
    n.UiPagination = n.UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var o = this,
          u = o.Model,
          f,
          e = function () {
            f = t(".pl-pagination-element");
            f.on("click", function (n) {
              n.preventDefault(), u.set_pagination_number(t(this).data("pgnt"));
            });
          };
        u.$eventContainer.on(n.plpEvent.updatePagination, function () {
          f.removeSelected(),
            f
              .filter('[data-pgnt="' + u.get_pagination_number() + '"]')
              .addSelected();
        });
        u.$eventContainer.on(n.plpEvent.productListUpdated, function () {
          e();
        });
        e();
      },
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    n.UiProductList = n.UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var o = this,
          i = o.Page,
          f = o.Model,
          e,
          u = t("#productListContainer"),
          s = function () {
            n._OmnitureTracking.handleShoppingTool(),
              (e = n.wa_data.prop12),
              u.find(".pl-product-content").each(function () {
                var i = t(this).children("a");
                e && n.Utils.OmnitureManager.addShoppingToolHash(i, e);
              });
          };
        f.$eventContainer.on(
          n.plpServiceEvent.productListRequested,
          function () {
            u.addLoading();
          }
        );
        f.$eventContainer.on(n.plpServiceEvent.productListSucceeded, function (
          r,
          e
        ) {
          var o, h, c;
          u.html(e.ProductsHtml),
            i.pageType === "BrandPage" &&
              (t("#productListHeader .pl-banner").remove(),
              e.BannerHtml !== null &&
                t("#productListHeader").prepend(e.BannerHtml)),
            (o = u.find("#productList").data("totalproduct")),
            i.UpdateProductNumber(o),
            o === 0
              ? u.html(
                  "<span>" +
                    n.labels.MobileV3_ProductItem.NoMoreProducts +
                    "</span>"
                )
              : ((h = i.Blocs.color),
                h && h.enable(),
                s(),
                f.$eventContainer.trigger(n.plpEvent.productListUpdated)),
            f.isFirstState
              ? (f.isFirstState = !1)
              : ((c = t("#header").closest(".header-fixed").height()),
                t("html,body").animate({
                  scrollTop: t("#productListHeader").offset().top - c,
                })),
            u.removeLoading();
        });
        f.$eventContainer.on(
          window.plpServiceEvent.productListFailed,
          function () {
            u.removeLoading();
          }
        );
        s();
      },
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    n.UiSortTool = n.UiBloc.extend({
      init: function (i, r) {
        var o = this;
        o._super(i, r);
        var i = o.Page,
          u = o.Model,
          y = !1,
          a = !1,
          f,
          s,
          h = t("#sortPopin"),
          v = t("#sortPopinTrigger"),
          p = t("#filters"),
          c,
          w = t("#initialSort"),
          k = t("#sortMainButton"),
          e = t(".sort-option"),
          l,
          d = t("<span>", { class: "lr-tick lr-tick-light-success" }),
          g = function () {
            w.detach();
          },
          b = function () {
            h.popin({
              block: "#corePage",
              url: "/classementdesoffres",
              style: "full",
              trigger: "#sortPopinTrigger",
              preload: !1,
            }).on("popin.open", function () {
              t(".popin-wrapper.fade.in").scroll(),
                t(".popin-wrapper.fade.in").animate(
                  { scrollTop: t("#h2Classement").offset().top - 20 },
                  500
                );
            });
            v.on("click", function (n) {
              n.stopPropagation();
            });
          },
          nt = function () {
            if (((v = p.find("#sortPopinTrigger")), y)) {
              p.find("#sortPopin").remove();
              v.on("click", function (n) {
                n.stopPropagation(), h.popin("open");
              });
            } else
              (h = t("#sortPopin")),
                b(),
                e.addClass("mfilter-choice").prepend(d.clone()),
                (y = !0);
            w.appendTo(t("#panelBodySort")).show(), tt();
          },
          tt = function () {
            (l = t("#sort")),
              (s = l.find(".mfilter-apply")),
              (c = l.find(".mfilter-return.lr-button"));
            s.on("click", function () {
              f !== undefined &&
                u.get_sort_type() !== f &&
                (s.hide(), c.show(), u.set_sort_type(f));
            });
            if (
              (e.removeSelected(),
              e.each(function () {
                t(this).data("sort") === u.get_sort_type() &&
                  t(this).addSelected();
              }),
              !a)
            ) {
              e.on("click", function () {
                e.removeSelected(),
                  t(this).addSelected(),
                  (f = t(this).data("sort")),
                  f !== undefined && u.get_sort_type() === f
                    ? (s.hide(), c.show())
                    : (c.hide(), s.show());
              });
              a = !0;
            }
          };
        u.$eventContainer.on(n.plpEvent.updateSort, function () {
          e.removeSelected();
          var n = e.filter('[data-sort="' + u.get_sort_type() + '"]');
          n.addSelected(),
            k.html(n.text() + '<span class="lr-arrow lr-arrow-down"></span>'),
            o.close && o.close(),
            a &&
              (l.sidePanel("close"),
              u.get_sort_type() !== "noSorting"
                ? (t("#openSort").addSelected(),
                  t("#openSort").find(".lr-arrow").addClass("lr-arrow-success"))
                : (t("#openSort").removeSelected(),
                  t("#openSort")
                    .find(".lr-arrow")
                    .removeClass("lr-arrow-success")));
        });
        if (i.isMobileDevice) {
          u.$eventContainer.on(n.plpServiceEvent.filtersRequested, function () {
            g();
          });
          u.$eventContainer.on(n.plpEvent.filtersUpdated, function () {
            nt();
          });
          u.$eventContainer.on(n.plpEvent.sortApplied, function () {
            f !== undefined && u.set_sort_type(f);
          });
        } else
          e.on("click", function () {
            u.set_sort_type(t(this).data("sort"));
          });
        h.length > 0 && b();
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiSortToolMain = n.UiSortTool.extend({
      init: function (i, r) {
        this._super(i, r);
        var s = this,
          h = s.Model,
          u = !1,
          c = t("#sortMain"),
          f = t("#sortMainContent"),
          l = t("#initialSort"),
          o = t("#sortMainButton"),
          a = function () {
            f.removeHidden(), (u = !0);
          },
          e = function () {
            f.addHidden(), (u = !1);
          };
        o.click(function () {
          u ? e() : a(),
            o.find(".lr-arrow").toggleClass("lr-arrow-up lr-arrow-down");
        });
        t(n.document).on("click", function (n) {
          u && t.contains(c[0], t(n.target)[0]) === !1 && e();
        });
        h.$eventContainer.on(n.plpEvent.updateSort, e);
        l.appendTo(f).show();
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiTagsMain = n.UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var o = this,
          i = o.Page,
          u = o.Model,
          a = {
            noSorting: "DefaultSort",
            priceAsc: "SortPriceAsc",
            priceDesc: "SortPriceDesc",
            discountDesc: "SortDiscount",
            tagNewDesc: "SortTag",
            ratingDesc: "SortRating",
          },
          f = t("#tag-header"),
          e = t("#filter-tag-cancel"),
          s = t("<span>", {
            class: "tag",
            "data-cerberus": "txt_plpProduit_filter1_value1",
          }),
          h = function () {
            f.find(".tag").remove();
          },
          v = function (n) {
            var i = s.clone(),
              t = n.text;
            (t = t.replace(
              '<span class="lr-tick lr-tick-light-success"></span>',
              ""
            )),
              (t = t.replace("filter-item-value dimContentValue", "")),
              (t = t.replace("div", "span")),
              i.attr("data-filter", n.fullValue),
              n.isExcludeFilter && (t = n.title + " : " + t),
              i.html(t);
            i.on("click", function () {
              u.remove_filters_data(n.fullValue);
            });
            return i;
          },
          y = function () {
            h(), u.set_plp_status({ filters: "", pgnt: 1, srt: "noSorting" });
          },
          c = function () {
            var n = f.find(".tag").length;
            n > 0 ? (f.show(), n > 1 ? e.show() : e.hide()) : f.hide();
          },
          l = function () {
            var r, i;
            if (
              (t(".tag-sort").remove(),
              (r = u.get_sort_type()),
              r !== "noSorting")
            ) {
              (i = s.clone()),
                i.removeAttr("data-cerberus").addClass("tag-sort"),
                i.text(
                  n.labels.MobileV3_ProductItem.Sort +
                    " : " +
                    n.labels.MobileV3_ProductItem[a[r]]
                );
              i.on("click", function () {
                u.set_sort_type("noSorting");
              });
              f.append(i);
            }
          };
        e.on("click", function () {
          y();
        });
        u.$eventContainer.on(n.plpEvent.filtersUpdated, function () {
          h(),
            l(),
            t.each(u.filters, function (n, t) {
              f.append(v(t));
            }),
            c();
        });
        u.$eventContainer.on(n.plpEvent.updateSort, function () {
          l(), c();
        });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiTagsMobile = n.UiBloc.extend({
      init: function (i, r) {
        var f = this;
        f._super(i, r);
        var i = f.Page,
          u = f.Model,
          l = {
            noSorting: "DefaultSort",
            priceAsc: "SortPriceAsc",
            priceDesc: "SortPriceDesc",
            discountDesc: "SortDiscount",
            tagNewDesc: "SortTag",
            ratingDesc: "SortRating",
          },
          e = t(".pl-filters-capsules"),
          a = t("#filter-tag-cancel"),
          v = t("<span>", {
            class:
              "lr-capsule-small-span-left lr-icon lr-icon-cross-small-success",
          }),
          o = t("<span>", { class: "lr-capsule-small-text" }),
          s = t("<button>", {
            class: "tag lr-capsule-small lr-capsule-small-light-success",
            "data-cerberus": "txt_plpProduit_filter1_value1",
          }).append(v),
          y = function (t) {
            var i = s.clone(),
              r = o.clone(),
              f =
                n.labels.MobileV3_ProductItem.Sort +
                " : " +
                n.labels.MobileV3_ProductItem[l[t]];
            i.removeAttr("data-cerberus").addClass("tag-sort"),
              r.text(f),
              i.append(r);
            i.on("click", function () {
              u.set_sort_type("noSorting");
            });
            return i;
          },
          p = function (n) {
            var t = s.clone(),
              r = o.clone(),
              i = n.isExcludeFilter ? n.title + " : " + n.text : n.text;
            (i = i.replace(
              '<span class="lr-tick lr-tick-light-success"></span>',
              ""
            )),
              t.attr("data-filter", n.fullValue),
              r.html(i),
              t.append(r);
            t.on("click", function () {
              u.remove_filters_data(n.fullValue);
            });
            return t;
          },
          h = function () {
            c(),
              b(),
              Object.keys(u.filters).length > 0
                ? (t("#backToTop").hide(),
                  t.each(u.filters, function (n, t) {
                    e.append(p(t));
                  }))
                : t("#backToTop").show();
          },
          w = function () {
            c(), u.set_plp_status({ filters: "", pgnt: 1, srt: "noSorting" });
          },
          c = function () {
            e.find(".tag").remove();
          },
          b = function () {
            t(".tag-sort").remove();
            var n = u.get_sort_type();
            n !== "noSorting" && e.append(y(n));
          };
        a.on("click", function () {
          w();
        });
        u.$eventContainer.on(n.plpEvent.filtersUpdated, function () {
          h();
        });
        u.$eventContainer.on(n.plpEvent.updateSort, function () {
          h();
        });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    var i = function (n) {
      return ("0" + n).slice(-2);
    };
    (n.FlashSales = n.Page.extend({
      init: function (i, r) {
        this._super(i, r);
        var u = this,
          f = u.Model;
        t(".countdown-container").each(function () {
          var n = new UiCountDown(u, "UiCountDown", null, t(this));
        }),
          t(".fs-countdown").each(function () {
            var n = new UiFsCountDown(u, "UiFsCountDown", null, t(this));
          }),
          t(".start-date").each(function () {
            var n = new UiFSComingSoon(u, "UiFSComingSoon", null, t(this));
          });
        Utils.Common.onCustomClick(t(".fs-link"), function (i) {
          f.$eventContainer.trigger(n.fsTrackingEvent.FLASHSALE_REQUESTED, [
            t(i).data("position"),
            t(i).data("flashsaleid"),
          ]),
            f.$eventContainer.trigger(
              n.globalTrackingEvent.SHOPPING_TOOL_USED,
              [{ type: "INTERNAL", subType: "VentesFlash", extraData: "hub" }]
            );
        });
      },
    })),
      (n.UiCountDown = n.UiBloc.extend({
        init: function (r, u, f, e) {
          var b = this,
            w;
          b._super(r, u);
          var h = "countdown",
            o,
            c = !0,
            k = e.find(".hours"),
            d = e.find(".minutes"),
            g = e.find(".seconds"),
            l = e.find("." + h + "-wrapper"),
            nt = e.find("." + h + "-message"),
            s = function () {
              var n = new Date(
                new Date(e.data("time") * 1e3).setHours(0, 0, 0, 0)
              );
              o = Date.parse(n) - Date.parse(new Date());
              var t = Math.floor((o / 1e3) % 60),
                i = Math.floor((o / 6e4) % 60),
                r = Math.floor((o / 36e5) % 24),
                u = Math.floor(o / 864e5);
              return {
                total: o,
                days: u + 1,
                hours: r,
                minutes: i,
                seconds: t,
              };
            },
            a = function () {
              return l.addClass("hide");
            },
            tt = function () {
              return l.removeClass("hide");
            },
            v = function () {
              return (
                o || (o = s()), o.days < 2 && o.days >= 0 && o.seconds >= 0
              );
            },
            it = function () {
              o = s();
              var i = t("<div>", { class: "btn btn-secondary fl-btn" });
              i.text(
                Math.abs(o.days) +
                  " " +
                  n.labels.MobileV3_FlashSalesList.FlashSalesDaysLeft
              ),
                nt.html(i);
            },
            y = function () {
              var n = i(o.hours);
              return (
                (n =
                  '<span class="number">' +
                  n.charAt(0) +
                  '</span><span class="number">' +
                  n.charAt(1) +
                  "</span>"),
                k.html(n)
              );
            },
            p = function () {
              var n = i(o.minutes);
              return (
                (n =
                  '<span class="number">' +
                  n.charAt(0) +
                  '</span><span class="number">' +
                  n.charAt(1) +
                  "</span>"),
                d.html(n)
              );
            },
            rt = function () {
              var n = i(o.seconds);
              (n =
                '<span class="number">' +
                n.charAt(0) +
                '</span><span class="number">' +
                n.charAt(1) +
                "</span>"),
                g.html(n);
            },
            ut = function () {
              (o = s()),
                c
                  ? (tt(), y(), p(), (c = !1))
                  : (o.minutes === 59 && y(), o.seconds === 59 && p()),
                rt(),
                v() || (clearInterval(w), a());
            };
          v()
            ? (w = setInterval(function () {
                ut();
              }, 1e3))
            : (a(), it());
        },
      })),
      (n.UiFsCountDown = n.UiBloc.extend({
        init: function (n, r, u, f) {
          var g = this,
            d;
          g._super(n, r);
          var h = !0,
            e,
            l = f.find(".days"),
            o = f.find(".hours"),
            nt = f.find(".minutes"),
            c,
            s = f.find(".seconds"),
            a = function () {
              var t = new Date(
                  new Date(f.data("time") * 1e3).setHours(0, 0, 0, 0)
                ),
                n = Date.parse(t) - Date.parse(new Date());
              return {
                total: n,
                days: Math.floor(n / 864e5),
                hours: Math.floor((n / 36e5) % 24),
                minutes: Math.floor((n / 6e4) % 60),
                seconds: Math.floor((n / 1e3) % 60),
              };
            },
            v = function () {
              f.remove(),
                n.name === pageName.plp && t(".pl-title").removeClass("hide");
            },
            tt = function () {
              f.removeClass("hide"),
                n.name === pageName.plp && t(".pl-title").addClass("hide");
            },
            y = function () {
              return e || (e = a()), e.seconds >= 0;
            },
            p = function () {
              if (e.days >= 2) {
                var n = i(e.days);
                return (
                  (n =
                    '<span class="number">' +
                    n.charAt(0) +
                    '</span><span class="number">' +
                    n.charAt(1) +
                    "</span>"),
                  l.html(n)
                );
              }
              l.parent().remove();
            },
            w = function () {
              var n;
              return (
                (n = e.days === 1 ? i(e.hours + 24) : i(e.hours)),
                (n =
                  '<span class="number">' +
                  n.charAt(0) +
                  '</span><span class="number">' +
                  n.charAt(1) +
                  "</span>"),
                e.hours < 2
                  ? (o.parent().find(".multi").addClass("hide"),
                    o.parent().find(".single").removeClass("hide"))
                  : (o.parent().find(".single").addClass("hide"),
                    o.parent().find(".multi").removeClass("hide")),
                o.html(n)
              );
            },
            b = function () {
              var n = i(e.minutes);
              return (
                (n =
                  '<span class="number">' +
                  n.charAt(0) +
                  '</span><span class="number">' +
                  n.charAt(1) +
                  "</span>"),
                nt.html(n)
              );
            },
            k = function () {
              if (e.days < 2) {
                c !== undefined
                  ? (f.find(".fs-countdown-timezone").append(c.clone()),
                    (c = undefined),
                    (s = f.find(".seconds")))
                  : h && s.parent().removeClass("hide");
                var n = i(e.seconds);
                (n =
                  '<span class="number">' +
                  n.charAt(0) +
                  '</span><span class="number">' +
                  n.charAt(1) +
                  "</span>"),
                  s.html(n);
              } else
                h &&
                  ((c = s.parent().clone().removeClass("hide")),
                  s.parent().remove());
            },
            it = function () {
              (e = a()),
                h
                  ? (tt(), p(), w(), b(), k(), (h = !1))
                  : (e.seconds === 59 &&
                      (e.minutes === 59 && (e.hours === 23 && p(), w()), b()),
                    k()),
                y() || (clearInterval(d), v());
            };
          y()
            ? (d = setInterval(function () {
                it();
              }, 1e3))
            : v();
        },
      })),
      (n.UiFSComingSoon = n.UiBloc.extend({
        init: function (t, r, u, f) {
          var s = this,
            e,
            o;
          s._super(t, r),
            (e = function () {
              var t = f.data("time"),
                n = new Date(t * 1e3),
                i = n.getFullYear(),
                r = n.getMonth() + 1,
                u = n.getDate();
              return { year: i, month: r, day: u };
            }),
            (o = function () {
              var t = e(),
                r = i(t.day) + "/" + i(t.month) + "/" + t.year;
              f.html(
                n.labels.MobileV3_FlashSalesList.FlashSalesStartingOn + " " + r
              );
            }),
            o();
        },
      }));
  })(window, jQuery);

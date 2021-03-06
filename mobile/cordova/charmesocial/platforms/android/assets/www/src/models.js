// Generated by CoffeeScript 1.9.3

/*
	Name:
	charme_schema

	Info:
	Global Context Definitions
 */

(function() {
  this.charme_schema_services = ["software", "music", "electronic", "clean", "artist", "trainer"];

  this.charme_schema_services_names = {
    "software": "Software Engineer",
    "music": "Musician",
    "electronic": "Electronic Engineer",
    "clean": "Room Cleaning",
    "artist": "Artist",
    "trainer": "Trainer"
  };

  this.charme_schema_categories = [
    {
      id: 'el',
      name: 'Electronics and Hardware',
      sub: [
        {
          id: 'el_smartphone',
          name: 'Smartphones and Mobile Phones'
        }, {
          id: 'el_smartphone',
          name: 'PC Components',
          sub: [
            {
              id: 'el_pc_cpu',
              name: 'CPU'
            }, {
              id: 'el_pc_ram',
              name: 'RAM'
            }, {
              id: 'el_pc_mainbaord',
              name: 'Mainboard'
            }, {
              id: 'el_pc_hdd',
              name: 'Harddisk'
            }
          ]
        }
      ]
    }, {
      id: 'cl',
      name: 'Clothing',
      sub: [
        {
          id: 'cl_shoes',
          name: 'Shoes'
        }, {
          id: 'cl_hats',
          name: 'Hats'
        }
      ]
    }, {
      id: 'fo',
      name: 'Food and drinks',
      sub: [
        {
          id: 'fo_drink',
          name: 'Drinks',
          sub: [
            {
              id: 'fo_drink_lemonade',
              name: 'Lemonade'
            }, {
              id: 'fo_drink_milk',
              name: 'Milk'
            }, {
              id: 'fo_drink_beer',
              name: 'Beer'
            }, {
              id: 'fo_drink_water',
              name: 'Water'
            }
          ]
        }, {
          id: 'fo_meal',
          name: 'Meal'
        }, {
          id: 'fo_snack',
          name: 'Sweets',
          sub: [
            {
              id: 'fo_snack_chocolate',
              name: 'Chocolate'
            }
          ]
        }
      ]
    }
  ];

  this.charme_schema = {
    global: {
      'move': {
        name: "Move from A to B",
        attributes: [
          {
            id: "startLocation",
            type: "location",
            name: "Start",
            filter: "location"
          }, {
            id: "endLocation",
            type: "location",
            name: "Destination",
            filter: "location"
          }, {
            id: "startTime",
            type: "datetime",
            name: "Start Time"
          }, {
            id: "endTime",
            type: "datetime",
            name: "End Time"
          }, {
            id: "seats",
            type: "int",
            name: "Seats",
            filter: "range"
          }
        ]
      },
      'offer': {
        name: "Offer",
        attributes: [
          {
            id: "price",
            type: "moneyamount",
            name: "Price",
            filter: "range"
          }, {
            id: "currency",
            type: "currency",
            name: "Currency"
          }, {
            id: "sell",
            type: "productcategory",
            name: "Product Identifier",
            filter: "exact"
          }
        ]
      },
      'service': {
        name: "Service",
        attributes: [
          {
            id: "price",
            type: "moneyamount",
            name: "Price per hour "
          }, {
            id: "currency",
            type: "currency",
            name: "Currency"
          }, {
            id: "service",
            type: "service",
            name: "Typ"
          }
        ]
      },
      'meal': {
        name: "Meal",
        attributes: [
          {
            id: "people",
            type: "int",
            name: "Number of People",
            filter: "range"
          }, {
            id: "location",
            type: "optionallocation",
            name: "Location (optional)",
            filter: "location"
          }
        ]
      },
      'activity': {
        name: "Activity",
        attributes: [
          {
            id: "location",
            type: "optionallocation",
            name: "Location (optional)",
            filter: "location"
          }, {
            id: "activity",
            type: "activity",
            name: "Type:"
          }
        ]
      },
      'review': {
        name: "Review",
        attributes: [
          {
            id: "target",
            type: "entity",
            name: "Entity"
          }, {
            id: "rating",
            type: "rating",
            name: "Rating"
          }
        ]
      },
      'publicevent': {
        name: "Event",
        attributes: [
          {
            id: "Title",
            type: "string",
            name: "Title:"
          }, {
            id: "location",
            type: "location",
            name: "Location"
          }, {
            id: "startTime",
            type: "datetime",
            name: "Start Time"
          }, {
            id: "endTime",
            type: "datetime",
            name: "End Time"
          }, {
            id: "audience",
            type: "int",
            name: "Guests"
          }
        ]
      }
    }
  };

  CharmeModels.ListOperations = (function() {
    function ListOperations() {}

    ListOperations.makeUniqueList = function(list) {
      var uniqueNames;
      uniqueNames = [];
      $.each(list, function(i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          return uniqueNames.push(el);
        }
      });
      return uniqueNames;
    };

    return ListOperations;

  })();

  CharmeModels.SimpleStorage = (function() {
    function SimpleStorage() {}

    SimpleStorage.getItems = function(className, encrypt, callbackFunction) {
      if (encrypt == null) {
        encrypt = false;
      }
      return apl_request({
        'requests': [
          {
            'id': 'simpleStore',
            'action': 'get',
            'class': className
          }
        ]
      }, function(dataFromServer) {
        return typeof callbackFunction === "function" ? callbackFunction(dataFromServer.simpleStore) : void 0;
      });
    };

    SimpleStorage.storeItem = function(className, data, encrypt, callbackFunction) {
      if (encrypt == null) {
        encrypt = false;
      }
      return apl_request({
        'requests': [
          {
            'id': 'simpleStore',
            'action': 'add',
            'class': className,
            'data': data
          }
        ]
      }, function(d) {
        var status;
        status = 200;
        return typeof callbackFunction === "function" ? callbackFunction(status) : void 0;
      });
    };

    return SimpleStorage;

  })();

  CharmeModels.Signature = (function() {
    Signature.hash;

    Signature.revision;


    /*
    
    	Name:
    	Signature(originalMessage)
    
    	Info:
    	Generate a signature with the users private key.
    	
    	Params:
    	message:string:The message you want to sign
    
    	Location:
    	crypto.js
    
    	Code:JS:
    	var signature = crypto_sign("hallo welt", );
     */

    function Signature(originalMessage) {
      var key1, rsa;
      rsa = new RSAKey();
      key1 = getKeyByRevision(0);
      this.revision = key1.revision;
      rsa.setPrivateEx(key1.rsa.rsa.n, key1.rsa.rsa.e, key1.rsa.rsa.d, key1.rsa.rsa.p, key1.rsa.rsa.q, key1.rsa.rsa.dmp1, key1.rsa.rsa.dmq1, key1.rsa.rsa.coeff);
      console.log("---------------------------");
      console.log(originalMessage);
      this.hash = rsa.signStringWithSHA1(originalMessage);
    }


    /*
    	
    	Name:
    	Signature.Verify(hash, message2verify, publicKey)
    
    	Info:
    	Verify a signature. Returns TRUE or FALSE
    
    	Params:
    	signature:string:The signature to check
    	message:string:The message you want to check
    	publicKey:object:The publicKey (usually from key directory)
    
    	Location:
    	crypto.js
    
    	Code:JS:
    	// TODO
     */

    Signature.Verify = function(hash2Check, message2verify, publicKey) {
      var key1, result, x509;
      key1 = getKeyByRevision(0);
      alert("SIGNATURE VERIFICATION NOT WORKING YET!!!");
      x509 = new X509();
      x509.readCertNE(key1.rsa.rsa.n, key1.rsa.rsa.e);
      result = x509.subjectPublicKeyRSA.verifyString(message, signature);
      if (result === true) {
        return true;
      } else {
        return false;
      }
    };

    Signature.keyToPem = function(n, e) {
      var i, linecount, pem, pemnew, rsa;
      rsa = new RSAKey();
      rsa.setPublic(n, e);
      pem = rsa.publicKeyToX509PemString();
      linecount = Math.ceil(pem.length / 64);
      pemnew = "-----BEGIN PUBLIC KEY-----\n";
      i = 0;
      while (i < linecount) {
        pemnew += pem.substr(i * 64, 64) + "\n";
        i++;
      }
      return pemnew += "-----END PUBLIC KEY-----";
    };

    Signature.prototype.toJSON = function() {
      return {
        keyRevision: this.revision,
        hashvalue: this.hash
      };
    };

    Signature.showDialog = function() {
      return $.get("templates/box_checksign.html", function(d) {
        var template;
        _.templateSettings.variable = "rc";
        template = _.template(d, null);
        return ui_showBox(template, function() {});
      });
    };


    /*
    
    		Return Form: {object, signature {keyRevision, hashvalue}}
     */

    Signature.makeSignedJSON = function(object) {
      var jsonString, theSignature;
      jsonString = JSON.stringify(object);
      console.log(jsonString);
      console.log("signature is");
      theSignature = new CharmeModels.Signature(jsonString);
      console.log(theSignature);
      return {
        "object": object,
        "signature": theSignature.toJSON()
      };
    };

    Signature.verifySignedJSON = function(object, key) {
      var str;
      str = JSON.stringify(object);
      return CharmeModels.Signature.Verify(object.signature.hashvalue, str, key);
    };

    return Signature;

  })();

  CharmeModels.Keys = (function() {
    function Keys() {}

    Keys.buildHash = function(key) {
      return CryptoJS.SHA256(CryptoJS.SHA256(key.n) + CryptoJS.SHA256(key.e));
    };

    Keys.makeRsaFkKeypair = function(publicKey) {
      var fastkey, randomKey, rk, rsa, rsaEncKey;
      randomKey = randomAesKey(32);
      fastkey = getFastKey(0, 1);
      rk = aes_encrypt(fastkey.fastkey1, randomKey);
      rsa = new RSAKey();
      rsa.setPublic(publicKey.n, publicKey.e);
      rsaEncKey = rsa.encrypt(randomKey);
      return {
        rsaEncKey: rsaEncKey,
        "revision": fastkey.revision,
        "randomKey": rk,
        "randomKeyRaw": randomKey
      };
    };

    Keys.mapDirectoryKey = function(userId) {
      var dirkey, fastkey;
      fastkey = getFastKey(0, 1);
      dirkey = CryptoJS.SHA256(fastkey.fastkey1 + userId).toString(CryptoJS.enc.Base64);
      return dirkey;
    };

    Keys.makeKeyStoreRequestObject = function(publicKey, addedPublicKeyRevision, publicKeyUserId, username) {
      var e_value, edgekey, fastkey, keyhash, keypair, request;
      fastkey = getFastKey(0, 1);
      e_value = aes_encrypt(fastkey.fastkey1, JSON.stringify({
        key: publicKey,
        revision: addedPublicKeyRevision,
        userId: publicKeyUserId
      }));
      keyhash = aes_encrypt_json(fastkey.fastkey1, {
        revision: addedPublicKeyRevision,
        hash: CharmeModels.Keys.buildHash(publicKey)
      });
      keypair = CharmeModels.Keys.makeRsaFkKeypair(publicKey);
      edgekey = {
        "revisionA": fastkey.revision,
        "revisionB": addedPublicKeyRevision,
        "revision": fastkey.revision + addedPublicKeyRevision,
        "rsaEncEdgekey": keypair.rsaEncKey,
        "fkEncEdgekey": keypair.randomKey,
        "userId": publicKeyUserId
      };
      request = {
        "id": "key_storeInDir",
        "key": CharmeModels.Keys.mapDirectoryKey(publicKeyUserId),
        "userId": publicKeyUserId,
        "keyhash": keyhash,
        "username": username,
        "pubKeyRevision": addedPublicKeyRevision,
        "fkrevision": fastkey.revision,
        "rsaEncEdgekey": keypair.rsaEncKey,
        "fkEncEdgekey": keypair.randomKey,
        "value": e_value,
        "edgekey": edgekey
      };
      return request;
    };

    return Keys;

  })();

  this.isResponsive = function() {
    return $(".header.responsive").is(":visible");
  };

  CharmeModels.Context = (function() {
    function Context() {}

    Context.setupLocationSelector = function() {
      var updateDataTag;
      updateDataTag = function() {
        $('.locationContainer option:selected').each(function() {
          $(this).parent().data('storage', $(this).data('json'));
        });
      };
      updateDataTag();
      return $('.locationContainer').change(function() {
        updateDataTag();
      });
    };

    Context.getTimeHours = function() {
      var j, k, len, ref, str;
      str = "";
      ref = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        str += "<option>" + k + "</option>";
      }
      return str;
    };

    Context.getTimeMinutes = function() {
      var j, k, len, ref, str;
      str = "";
      ref = [0, 15, 30, 45];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        str += "<option>" + k + "</option>";
      }
      return str;
    };

    Context.getRad = function() {
      var j, k, len, ref, str;
      str = "";
      ref = [1, 3, 5, 10, 25, 50];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        str += "<option value='" + k + "'>" + k + "km</option>";
      }
      return str;
    };

    Context.getActivities = function() {
      var j, k, len, ref, str;
      str = "";
      ref = ["Watching Soccer on TV", "Making Music", "Baseball", "Volleyball", "Table Tennis", "Soccer"];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        str += "<option vale='" + k + "'>" + k + "</option>";
      }
      return str;
    };

    Context.getContextChoices = function() {
      var all, k, ref, schema;
      all = [];
      ref = charme_schema.global;
      for (k in ref) {
        schema = ref[k];
        all.push({
          id: k,
          name: schema.name
        });
      }
      return all;
    };

    Context.getFilters = function(filterId) {
      var all, attribute, j, k, len, ref, ref1, schema;
      all = [];
      ref = charme_schema.global;
      for (k in ref) {
        schema = ref[k];
        ref1 = schema.attributes;
        for (j = 0, len = ref1.length; j < len; j++) {
          attribute = ref1[j];
          if (attribute.filter != null) {
            all.push({
              contextId: k,
              attribute: attribute
            });
          }
        }
      }
      return all;
    };

    Context.getContextFloats = function(type) {
      var all, attribute, j, len, ref;
      all = [];
      ref = charme_schema.global[type].attributes;
      for (j = 0, len = ref.length; j < len; j++) {
        attribute = ref[j];
        if (attribute.type === "moneyamount") {
          all.push(attribute.id);
        }
      }
      return all;
    };

    Context.getContextIntegers = function(type) {
      var all, attribute, j, len, ref;
      all = [];
      ref = charme_schema.global[type].attributes;
      for (j = 0, len = ref.length; j < len; j++) {
        attribute = ref[j];
        if (attribute.type === "int") {
          all.push(attribute.id);
        }
      }
      return all;
    };

    Context.getServices = function() {
      var j, len, str, v;
      str = "";
      for (j = 0, len = charme_schema_services.length; j < len; j++) {
        v = charme_schema_services[j];
        str += "<option value='" + v + "'>" + charme_schema_services_names[v] + "</option>";
      }
      return str;
    };

    Context.getDateSelector = function(name) {
      var j, k, l, len, m, ref, str;
      str = "";
      str += "<select  name='" + name + "_day'>";
      for (k = j = 1; j < 31; k = j += 1) {
        str += "<option vale='" + k + "'>" + k + "</option>";
      }
      str += "</select>";
      str += "<select  name='" + name + "_month'>";
      for (k = l = 1; l < 12; k = l += 1) {
        str += "<option vale='" + k + "'>" + k + "</option>";
      }
      str += "</select>";
      str += "<select name='" + name + "_year'>";
      ref = ["2014", "2015", "2016"];
      for (m = 0, len = ref.length; m < len; m++) {
        k = ref[m];
        str += "<option vale='" + k + "'>" + k + "</option>";
      }
      str += "</select>";
      return str;
    };

    Context.getCurrencies = function() {
      var j, k, len, ref, str;
      str = "";
      ref = ["EUR", "USD", "BTC", "YEN"];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        str += "<option vale='" + k + "'>" + k + "</option>";
      }
      return str;
    };

    Context.getRating = function() {
      var j, k, len, ref, str;
      str = "";
      ref = ["5", "4", "3", "2", "1"];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        str += "<option>" + k + "</option>";
      }
      return str;
    };

    Context.searchRecursiveId = function(node, parentId, level) {
      var j, len, retval, subnode;
      if (level == null) {
        level = 0;
      }
      for (j = 0, len = node.length; j < len; j++) {
        subnode = node[j];
        if (subnode.id === parentId) {
          return subnode.sub;
        } else if (subnode.sub != null) {
          retval = this.searchRecursiveId(subnode.sub, parentId, level + 1);
          if (retval != null) {
            return retval;
          }
        }
      }
    };

    Context.searchRecursiveText = function(node, query) {
      var j, len, retArray, subnode, subres;
      retArray = [];
      for (j = 0, len = node.length; j < len; j++) {
        subnode = node[j];
        if (subnode.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
          retArray.push(subnode);
        }
        if (subnode.sub != null) {
          subres = this.searchRecursiveText(subnode.sub, query);
          retArray = retArray.concat(subres);
        }
      }
      return retArray;
    };

    Context.renderCateogries = function(parentId, searchQuery) {
      var item, j, len, parent, str;
      str = "";
      if (searchQuery !== "" && (searchQuery != null)) {
        parent = CharmeModels.Context.searchRecursiveText(charme_schema_categories, searchQuery);
      } else {
        if (parentId == null) {
          parent = charme_schema_categories;
        } else {
          parent = CharmeModels.Context.searchRecursiveId(charme_schema_categories, parentId);
        }
      }
      for (j = 0, len = parent.length; j < len; j++) {
        item = parent[j];
        if (str !== "") {
          str += ", ";
        }
        if (item.sub != null) {
          str += "<a class='selectCategory' data-cat='" + item.id + "'>" + item.name + "</a>";
        } else {
          str += "<a class='selectCategory' data-final='" + item.id + "'>" + item.name + "</a>";
        }
      }
      return str;
    };

    Context.registerEventProductClick = function(elementHelp) {
      $(elementHelp).parent().find('.productidentifierHelp a').unbind('click').click(function() {
        var elementSearch;
        if ($(this).data('cat') != null) {
          elementSearch = $(elementHelp).prev().prev();
          $(elementHelp).html(CharmeModels.Context.renderCateogries($(this).data('cat')));
          return CharmeModels.Context.registerEventProductClick(elementHelp);
        } else {
          elementSearch = $(elementHelp).prev().prev();
          $(elementHelp).html('<b>' + $(this).text() + '</b> - <a class=\'resetProduct\'>Select another Category</a>');
          $(elementSearch).next().val($(this).data('final'));
          $(elementHelp).find('.resetProduct').click(function() {
            $(elementSearch).show().focus().select();
            $(elementHelp).html(CharmeModels.Context.renderCateogries(null));
            CharmeModels.Context.registerEventProductClick(elementHelp);
          });
          $(elementSearch).hide();
        }
      });
    };

    Context.initProductSelector = function() {
      $(".productidentifierHelp").each(function() {
        CharmeModels.Context.registerEventProductClick(this);
      });
      $('.productidentifierSearch').bind('propertychange onkeydown click keyup input paste', function() {
        var elementHelp;
        elementHelp = $(this).next().next();
        $(elementHelp).html(CharmeModels.Context.renderCateogries(null, $(this).val()));
        CharmeModels.Context.registerEventProductClick(elementHelp);
      });
    };

    Context.getProductSelector = function(name) {
      return '<input placeholder="Search..." class="productidentifierSearch box" type="text" style="margin-bottom:8px;"><input style="clear:both" data-type="exact" type="hidden" name="' + name + '" class="productSelector"><div  class="productidentifierHelp">' + CharmeModels.Context.renderCateogries() + '</div>';
    };

    Context.getForm = function(fieldId) {
      var html, k, ref, v;
      html = "";
      ref = charme_schema.global[fieldId].attributes;
      for (k in ref) {
        v = ref[k];
        html += "<div style='padding:8px 0px; font-weight:bold;'>" + v["name"] + "</div>";
        if (v["type"] === "area") {
          html += "<select  name='" + v["id"] + "' class='locationContainer'></select> <a class='but_addLocation'>Add Location</a> Radius: <select name='" + v["id"] + "_radius'>" + CharmeModels.Context.getRad() + "</select>";
        } else if (v["type"] === "location") {
          html += "<select name='" + v["id"] + "' class='locationContainer'></select> <a class='but_addLocation'>Add Location</a>";
        } else if (v["type"] === "optionallocation") {
          html += "<select name='" + v["id"] + "' class='locationContainer'><option value='0' class='nolocation'>No location</option></select> <a class='but_addLocation'>Add Location</a>";
        } else if (v["type"] === "string") {
          html += "<input  name='" + v["id"] + "' type='text' class='box'>";
        } else if (v["type"] === "entity") {
          html += "<input  name='" + v["id"] + "' type='text' class='box'>";
        } else if (v["type"] === "rating") {
          html += '<select name="' + v["id"] + '">' + CharmeModels.Context.getRating() + '</select> (5 is best)';
        } else if (v["type"] === "datetime") {
          html += CharmeModels.Context.getDateSelector(v["id"]) + ' <select name="' + v["id"] + '_hour">' + CharmeModels.Context.getTimeHours() + '</select>:<select  name="' + v["id"] + '_minute">' + CharmeModels.Context.getTimeMinutes() + '</select>';
        } else if (v["type"] === "int") {
          html += "<input name='" + v["id"] + "' type='text' class='box'>";
        } else if (v["type"] === "moneyamount") {
          html += "<input data-typed='float' name='" + v["id"] + "' type='text' class='box'>";
        } else if (v["type"] === "currency") {
          html += '<select name="' + v["id"] + '">' + CharmeModels.Context.getCurrencies() + '</select>';
        } else if (v["type"] === "activity") {
          html += '<select name="' + v["id"] + '">' + CharmeModels.Context.getActivities() + '</select>';
        } else if (v["type"] === "service") {
          html += '<select name="' + v["id"] + '">' + CharmeModels.Context.getServices() + '</select>';
        } else if (v["type"] === "productcategory") {
          html += CharmeModels.Context.getProductSelector(v["id"]);
        }
        html += "<br>";
      }
      return html;
    };

    return Context;

  })();

}).call(this);

$(document).ready(function() {
    var ftJson = {
        "familyTree" : [{
            "name" : "Linda Dombrosky",
            "birthday" : "10/30/1955",
            "married" : {
                "name" : "David Dombrosky",
                "birthday" : "7/27/1955"
            },
            "children": [
                {
                    "name" : "Kevin Dombrosky",
                    "birthday" : "6/27/1994",
                },
                {
                    "name" : "",
                    "birthday" : "3/7/1983",
                    "married" : {
                        "name" : "",
                        "birthday" : "1986?"
                    }
                }
            ]
        }]
    };

    console.log(ftJson);

    function createSVGElements(ftNode, iter)
    {
        ftNode["textLength"] = Math.max.apply(Math, [ftNode["name"].length, ftNode["birthday"].length]);
        //not displaying, look into that
        $("#familyTreeSVG").append("<text x='20' y=" + 10 * iter + ">" + ftNode["name"] + "</text>");
        $("#familyTreeSVG").append("<text x='20' y=" + (10 * (iter + 1)) + ">" + ftNode["birthday"] + "</text>");
    }

    function parseFamilyTreeNode(ftNode, iter)
    {
        createSVGElements(ftNode, iter);

        if (ftNode.hasOwnProperty("married"))
        {
            iter += 2;
            createSVGElements(ftNode["married"], iter);
        }
        
        if (ftNode.hasOwnProperty("children"))
        {
            $.each(ftNode["children"], function(index, value)
            {
                parseFamilyTreeNode(value, iter + 2);
            });
        }
    }

    $.each(ftJson["familyTree"], function(index, value)
    {
        parseFamilyTreeNode(value, 1);
        console.log(value);
    });
});
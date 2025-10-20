/**
 * @file insert.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Script pour la gestion de l'insertion de données
 */

$(document).ready(function() {

    $('th[data-column="id"]').addClass('db-th__sorted-asc');

    $('th[data-column="id"]').on('click', function() {
        var column = $(this).index();
        var order = $(this).data('order');

        var $tbody = $('#dbTable');
        var rows = $tbody.find('tr').get();

        for (var i = 0; i < rows.length - 1; i++) 
        {
            for (var j = 0; j < rows.length - i - 1; j++) 
            {
                var a = parseInt($(rows[j]).find('td').eq(column).text().trim());
                var b = parseInt($(rows[j + 1]).find('td').eq(column).text().trim());

                var swap = false;
                if(order === 'asc') 
                {
                    if(a > b) 
                    {
                        swap = true;
                    }
                } 
                else{
                    if(a < b) 
                    {
                        swap = true;
                    }
                }

                if(swap) 
                {
                    var temp = rows[j];
                    rows[j] = rows[j + 1];
                    rows[j + 1] = temp;
                }
            }
        }

        if(order === 'asc') 
        {
            order = 'desc';
        } 
        else 
        {
            order = 'asc';
        }
        $(this).data('order', order);

        $tbody.append(rows);

        $('th').removeClass('db-th__sorted-asc db-th__sorted-desc');
        if(order === 'asc') 
        {
            $(this).addClass('db-th__sorted-asc');
        } 
        else 
        {
            $(this).addClass('db-th__sorted-desc');
        }
    });

    $('.database__save-button').on('click', function() 
    {
        var $newRows = $('#dbTable tr.db-tr--new');

        if($newRows.length === 0) 
        {
            alert('Aucune nouvelle ligne à ajouter');
            return;
        }

        var dataToSave = [];
        var validationError = false;

        $newRows.each(function() 
        {
            var rowData = {};
            var isEmpty = false;

            $(this).find('td').each(function(index) 
            {
                var key = $('th.db-th').eq(index).data('column');
                if(!key)
                {
                    return;
                }

                var value = $(this).text().trim().replace(/\s+/g, ' ');
                
                if(key === 'id') 
                {
                    value = parseInt(value);
                }
                else if(key === 'NbHab') 
                {
                    if(value === '') 
                    {
                        isEmpty = true;
                    } 
                    else 
                    {
                        value = parseInt(value);
                        if(isNaN(value))
                        {
                            isEmpty = true;
                        }
                    }
                }
                else if(key === 'PIB') 
                {
                    if(value === '' || value.toUpperCase() === 'NULL') 
                    {
                        value = null;
                    } 
                    else 
                    {
                        value = parseInt(value);
                        if(isNaN(value)) 
                        {
                            isEmpty = true;
                        }
                    }
                }
                else if(key === 'DensitePop')
                {
                    if(value === '') 
                    {
                        isEmpty = true;
                    } 
                    else 
                    {
                        value = parseFloat(value);
                        if(isNaN(value)) 
                        {
                            isEmpty = true;
                        }
                    }
                }
                else if(key === 'dejaVisite') 
                {
                    if(value === '') 
                    {
                        isEmpty = true;
                    } 
                    else 
                    {
                        value = value.toUpperCase().trim();
                        if(value !== 'O' && value !== 'N') 
                        {
                            isEmpty = true;
                        }
                    }
                }
                else if(key === 'Pays' || key === 'Capitale') 
                {
                    if(value === '') 
                    {
                        isEmpty = true;
                    }
                }

                rowData[key] = value;
            });

            if(isEmpty) 
            {
                validationError = true;
            } 
            else 
            {
                dataToSave.push(rowData);
            }
        });

        if(validationError) 
        {
            alert('Veuillez remplir tous les champs correctement');
            return;
        }

        $.ajax({
            url: '/insert',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataToSave),
            success: function() 
            {
                alert('Nouvelles lignes ajoutées avec succès!');
                location.reload();
            },
            error: function(err) 
            {
                console.error(err);
                alert('Erreur lors de l\'ajout');
            }
        });
    });

    $('.db-th--add-button').on('click', function(e) {
        e.preventDefault();
        addNewRow();
    });
});

function addNewRow() 
{
    var $tbody = $('#dbTable');
    var $rows = $tbody.find('tr');
    var $firstRow = $rows.first();

    var maxId = 0;
    $rows.each(function() 
    {
        var idText = $(this).find('td').eq(0).text().trim();
        var id = parseInt(idText);
        if(id > maxId) 
        {
            maxId = id;
        }
    });
    var nextId = maxId + 1;

    var colCount = $firstRow.find('td').length;

    var newRow = $('<tr class="db-tr db-tr--new"></tr>');

    for(var i = 0; i < colCount; i++) 
    {
        var $td = $('<td class="db-td"></td>');
        if(i === 0) 
        {
            $td.text(nextId).attr('contenteditable', 'false');
        } 
        else 
        {
            $td.text('').attr('contenteditable', 'true');
        }
        newRow.append($td);
    }

    $tbody.append(newRow);

    newRow.find('td').eq(1).focus();
}



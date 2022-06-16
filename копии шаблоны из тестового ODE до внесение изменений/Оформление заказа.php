[[!Shopkeeper3@cart_order_page]]


[[!FormIt?
&hooks=`shk_fihook,email,redirect`
&submitVar=`order`
&emailTpl=`shopOrderReport`
&emailSubject=`В интернет-магазине "[[++site_name]]" сделан новый заказ`
&emailTo=`info@test.ode-rus`
&emailFrom=`info@test.ode-rus`
&validate=`fullname:required,email:email:required,phone:required`
&redirectTo=`34`
&errTpl=`<br /><span class="error">[[+error]]</span>`
]]
    [[!$shop_order_form]]

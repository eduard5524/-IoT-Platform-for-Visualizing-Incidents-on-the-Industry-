# Robomap Backend Project

## Configurations
- http://localhost:8080
- User "mimrobomap@gmail.com", password "qwerty123"

## Starting
php artisan serve



## Laravel
Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:
- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

### Learning Laravel
Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of any modern web application framework, making it a breeze to get started learning the framework.

If you're not in the mood to read, [Laracasts](https://laracasts.com) contains over 1100 video tutorials on a range of topics including Laravel, modern PHP, unit testing, JavaScript, and more. Boost the skill level of yourself and your entire team by digging into our comprehensive video library.

### Laravel Sponsors
We would like to extend our thanks to the following sponsors for helping fund on-going Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell):
- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[British Software Development](https://www.britishsoftware.co)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- [UserInsights](https://userinsights.com)
- [Fragrantica](https://www.fragrantica.com)
- [SOFTonSOFA](https://softonsofa.com/)
- [User10](https://user10.com)
- [Soumettre.fr](https://soumettre.fr/)
- [CodeBrisk](https://codebrisk.com)
- [1Forge](https://1forge.com)
- [TECPRESSO](https://tecpresso.co.jp/)
- [Runtime Converter](http://runtimeconverter.com/)
- [WebL'Agence](https://weblagence.com/)
- [Invoice Ninja](https://www.invoiceninja.com)
- [iMi digital](https://www.imi-digital.de/)
- [Earthlink](https://www.earthlink.ro/)
- [Steadfast Collective](https://steadfastcollective.com/)

### Delete Laravel Cache
- php artisan optimize:clear

### Change Laravel Controller Directory
https://medium.com/@rakshithvasudev/moving-controllers-to-sub-folders-in-laravel-5-2-239fee39d5d6
1. You have a controller located in app\Http\Controllers.
2. Create a new folder and move it. For example, moving the SampleController.php file into a new folder called "Users".
3. Change the namespace from its default: namespace App\Http\Controllers.
4. Change the namespace to the relevant location. In our case, this controller is present inside "Users" folder. Therefore, add the appropiate namespace as: namespace App\Http\Controllers\Users.
5. After adding that line, add another line so this file is treated like a controller. use App\Http\Controllers\Controller.
6. Finally the controller looks like.
namespace App\Http\Controllers\Users;
use App\Http\Controllers\Controller;
7. Finally setup the route to check the outcome.
Route::resource('sample', 'Users\SampleController');
8. Check if Setup works.

### Change Model Directory
https://elishaukpongson.medium.com/overriding-laravels-default-models-folder-using-artisan-command-a362f5d77765
1. 

### Contributing
Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

### Security Vulnerabilities
If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

### License
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# Robomap Backend Project

## Configuration Data
- Angular
- http://localhost:4200

## Starting
1. Execute command "npm start".

## Common commands
- npm run build --prod" To upload in production 
- ng serve Build and serves your application

## Angular 
### Angular Component 
An angular component content the following files.
- CSS file for styiling.
- HTML file for the content.
- TS file for the behaviour.

### Rename Alngular Component
1. Right click "Move Typescript" and rename the component folder.
2. Edit and repair the files "app-routing.module.ts" and "app.module.ts" with the right path.
2. Compile the project.

### Template Variables
Template variables help you use data from one part of a template in another part of the template. Use template variables to perform tasks such as respond to user input or finely tune your application's forms. For more information https://angular.io/guide/template-reference-variables

For the name definitions we have the files in the different languages in the path ./src/assets/i18n.

### Send Variable from .ts to .html
1. In .ts put 
    public message:string; 
    this.message = "message";
2. In html add the tag {{message}}

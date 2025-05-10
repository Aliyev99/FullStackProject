using GoldStoreAPI.Data;
using GoldStoreAPI.Entyties;
using GoldStoreAPI.Helpers;
using GoldStoreAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var jwtShema = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Description = "Put Bearer + your token in the box below",
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Reference = new OpenApiReference 
        { 
            Id = JwtBearerDefaults.AuthenticationScheme, 
            Type = ReferenceType.SecurityScheme 
        }
    };

    c.AddSecurityDefinition(jwtShema.Reference.Id, jwtShema);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            jwtShema, Array.Empty<string>()
        }
    });
 
});


builder.Services.AddDbContext<GSUserDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("GsUserDbConnection"));
});

builder.Services.AddDbContext<GSResourceDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("GsResourceDbConnection"));
});


builder.Services.AddIdentityCore<User>(opt =>
    opt.User.RequireUniqueEmail = true
)
.AddRoles<Role>()
.AddEntityFrameworkStores<GSUserDbContext>();

builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:TokenKey"])),
        ClockSkew = TimeSpan.Zero
    };

    opt.SaveToken = true;
});



builder.Services.AddAuthorization();


builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddTransient<TokenService>();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
    });
}


app.UseCors(opt =>
{
   
    opt.AllowAnyHeader();
    opt.AllowAnyMethod();
    opt.AllowCredentials().WithOrigins("http://localhost:3000");
});
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


var scope = app.Services.CreateScope();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var userDbcontext = scope.ServiceProvider.GetService<GSUserDbContext>();
var resourceDbContext = scope.ServiceProvider.GetRequiredService<GSResourceDbContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();


await userDbcontext.Database.MigrateAsync();
try
{
    await DbInitializer.Initialize(userManager, userDbcontext, resourceDbContext);

}
catch (Exception ex)
{

    logger.LogError(ex, "Problem occured during initialization");

}




app.Run();

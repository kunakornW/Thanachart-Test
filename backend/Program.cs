using backend;
using backend.Database;
using backend.Database.Interface;
using backend.Database.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string env = builder.Configuration["Environment"]!.ToString();
AppSetting.ConnectionString = builder.Configuration.GetSection("ConnectionStrings")[env]!.ToString();

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(AppSetting.ConnectionString));

builder.Services.AddMemoryCache();
builder.Services.AddResponseCompression();

builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IProductRepo, ProductRepo>();
builder.Services.AddScoped<IStockRepo, StockRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(o => o.AllowAnyHeader().AllowAnyMethod().WithOrigins(@"http://localhost:3000"));

app.UseAuthorization();

app.MapControllers();

app.Run();
